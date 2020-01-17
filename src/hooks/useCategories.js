import { useState, useEffect } from 'react';
import { setErrors, trivia } from '../helpers/utils';

let localCache = [];

export default function() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let didCancel = false;
    if (!localCache.length) {
      trivia
        .post('api_category.php')
        .then(response => {
          if (!didCancel) {
            setCategories(response.data.trivia_categories);
            setLoading(false);
            localCache = response.data.trivia_categories;
          }
        })
        .catch(error => {
          setLoading(false);
          setErrors(error.message);
        });
    } else {
      setCategories(localCache);
      setLoading(false);
    }

    return () => {
      didCancel = true;
    };
  }, []);

  return [loading, categories];
}
