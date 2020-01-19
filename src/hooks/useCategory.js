import { useState, useEffect } from 'react';
import { trivia, setErrors, objectLen } from '../helpers/utils';

let cache = {
  total_question_count: 84,
  total_easy_question_count: 30,
  total_medium_question_count: 38,
  total_hard_question_count: 16
};

export const useCategory = categoryId => {
  const [category, setCategory] = useState(null);

  useEffect(() => {
    let cleanup = false;

    if (!objectLen(cache)) {
      trivia
        .get(`api_count.php?category=${categoryId}`)
        .then(result => {
          if (!cleanup) {
            cache = result.data.category_question_count;
            setCategory(cache);
          }
        })
        .catch(error => {
          setErrors(error);
        });
    } else {
      setCategory(cache);
    }

    return () => {
      cleanup = true;
    };
  }, [categoryId]);

  return category;
};
