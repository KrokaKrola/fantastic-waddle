import { useState, useEffect } from 'react';
import { trivia, setErrors, objectLen } from '../helpers/utils';

let cache = {
  total_question_count: 24,
  total_easy_question_count: 13,
  total_medium_question_count: 11,
  total_hard_question_count: 0
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
