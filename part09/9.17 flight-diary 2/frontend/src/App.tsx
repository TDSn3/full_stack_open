import { useEffect, useState } from 'react';
import { Diary } from './types';
import DiaryComponent from './DiaryComponent';
import { getAllDiaries } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  const hook = () => {
    getAllDiaries().then((data) => setDiaries(data));
  };

  useEffect(hook, []);

  return (
    <div>
      {
        diaries.map((diaryValue) => <DiaryComponent key={diaryValue.id} diary={diaryValue}/>)
      }
    </div>
  );
};

export default App;
