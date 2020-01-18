import { useState, useEffect } from 'react';
import { db } from '../firebase';

export default function(uid) {
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return db
      .collection(`/users/${uid}/favourites`)
      .onSnapshot(function(collection) {
        const docs = [];
        collection.forEach(doc => {
          docs.push(doc.data());
        });
        setFavourites(docs);
        setLoading(false);
      });
  }, [uid]);

  return [favourites, loading];
}
