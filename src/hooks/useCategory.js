import { useState, useEffect } from 'react';
import { trivia, setErrors } from '../helpers/utils';

let cache = {};

export const useCategory = categoryId => {
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cleanup = false;

    if (!cache[categoryId]) {
      trivia
        .get(
          `api_count.php${categoryId === 1 ? '' : `?category=${categoryId}`}`
        )
        .then(result => {
          if (!cleanup) {
            cache[categoryId] = result.data.category_question_count || {
              total_question_count: 10,
              total_easy_question_count: 10,
              total_medium_question_count: 10,
              total_hard_question_count: 10
            };
            setCategory(cache);
            setLoading(false);
          }
        })
        .catch(error => {
          setErrors(error);
        });
    } else {
      setCategory(cache[categoryId]);
      setLoading(false);
    }

    return () => {
      cleanup = true;
    };
  }, [categoryId]);

  return [category, loading];
};
