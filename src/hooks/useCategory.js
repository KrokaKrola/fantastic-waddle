import { useState, useEffect } from 'react';
import { trivia, setErrors } from '../helpers/utils';

let cache = [];

export const useCategory = categoryId => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    let cleanup = false;

    if (!cache.length) {
      trivia
        .get(`api_count.php?category=${categoryId}`)
        .then(result => {
          if (!cleanup) {
            cache = result.data.category_question_count;
            setCategory(result.data.category_question_count);
          }
        })
        .catch(error => {
          setErrors(error);
        });
    }

    return () => {
      cleanup = true;
    };
  }, [categoryId]);

  return category;
};
