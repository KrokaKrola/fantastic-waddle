import { useState, useEffect } from 'react';
import { trivia } from '../helpers/utils';

let testing = `{"response_code":0,"results":[{"category":"Entertainment: Japanese Anime & Manga","type":"boolean","difficulty":"easy","question":"Clefairy was intended to be Ash&#039;s starting Pok&eacute;mon in the pilot episode of the cartoon.","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"What is the age of Ash Ketchum in Pokemon when he starts his journey?","correct_answer":"10","incorrect_answers":["11","12","9"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"What was Ash Ketchum&#039;s second Pokemon?","correct_answer":"Caterpie","incorrect_answers":["Charmander","Pikachu","Pidgey"]},{"category":"Entertainment: Japanese Anime & Manga","type":"boolean","difficulty":"easy","question":"Gosho Aoyama Made This Series: (Detective Conan \/ Case Closed!)","correct_answer":"True","incorrect_answers":["False"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"In the anime Black Butler, who is betrothed to be married to Ciel Phantomhive?","correct_answer":"Elizabeth Midford","incorrect_answers":["Rachel Phantomhive","Alexis Leon Midford","Angelina Dalles"]},{"category":"Entertainment: Japanese Anime & Manga","type":"boolean","difficulty":"easy","question":"In the &quot;Toaru Kagaku no Railgun&quot; anime,  espers can only reach a maximum of level 6 in their abilities.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"In &quot;A Certain Scientific Railgun&quot;, how many &quot;sisters&quot; did Accelerator have to kill to achieve the rumored level 6?","correct_answer":"20,000","incorrect_answers":["128","10,000","5,000"]},{"category":"Entertainment: Japanese Anime & Manga","type":"boolean","difficulty":"easy","question":"Kiznaiver is an adaptation of a manga.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Japanese Anime & Manga","type":"boolean","difficulty":"easy","question":"In Chobits, Hideki found Chii in his apartment.","correct_answer":"False","incorrect_answers":["True"]},{"category":"Entertainment: Japanese Anime & Manga","type":"multiple","difficulty":"easy","question":"What animation studio produced &quot;Gurren Lagann&quot;?","correct_answer":"Gainax","incorrect_answers":["Kyoto Animation","Pierrot","A-1 Pictures"]}]}`;

export default function(category, difficulty) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cleanup = false;
    if (!cleanup) {
      setTimeout(() => {
        setQuestions(JSON.parse(testing).results);
        setLoading(false);
      }, 1000);
      // trivia
      //   .get(
      //     `/api.php?amount=10&category=${category}${
      //       difficulty === 'any' ? '' : `&difficulty=${difficulty}`
      //     }`
      //   )
      //   .then(result => {
      //     setQuestions(result.data);
      //     setLoading(false);
      //   });
    }

    return () => {
      cleanup = true;
    };
  }, [category, difficulty]);

  return [questions, loading];
}
