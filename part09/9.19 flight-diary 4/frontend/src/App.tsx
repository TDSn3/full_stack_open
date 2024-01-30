import { useEffect, useState } from 'react';
import axios from 'axios';
import { Diary, NewDiary } from './types';
import DiaryComponent from './components/DiaryComponent';
import DiaryForm from './components/DiaryForm';
import Notification from './components/Notification';
import { getAllDiaries, addNewDiary } from './diaryService';

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [newDate, setNewDate] = useState<string>('');
  const [newVisibility, setNewVisibility] = useState<string>('');
  const [newWeather, setNewWeather] = useState<string>('');
  const [newComment, setNewComment] = useState<string>('');
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationMessageClassName, setNotificationMessageClassName] = useState<string>('');

  const handleNewDateOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewDate(event.target.value);
  const handleNewVisibilityOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewVisibility(event.target.value);
  const handleNewWeatherOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewWeather(event.target.value);
  const handleNewCommentOnChange = (event: React.ChangeEvent<HTMLInputElement>) => setNewComment(event.target.value);

  const handleAddDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const diaryToAdd: NewDiary = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment,      
    }

    addNewDiary(diaryToAdd)
      .then((data) => {
        setDiaries(diaries.concat(data))
      })
      .catch( (error) => {
        if (axios.isAxiosError(error)) {
          console.log(`error.status: ${error.status}`);
          console.error(`error.response: ${error.response}`);

          setNotificationMessage(`${error.response?.data}`)
        } else {
          console.log(`error: ${error}`);
          
          setNotificationMessage('error')
        }

        setNotificationMessageClassName('error')
        setTimeout( () => {
            setNotificationMessage('')
            setNotificationMessageClassName('')
        }, 5000)
      })

      setNewDate('');
    setNewVisibility('');
    setNewWeather('');
    setNewComment('');
  };

  const hook = () => {
    getAllDiaries().then((data) => setDiaries(data));
  };

  useEffect(hook, []);

  return (
    <div>
      <Notification message={notificationMessage} messageClassName={notificationMessageClassName} />
      <DiaryForm
        handleAddDiary={handleAddDiary}
        newDate={newDate}
        handleNewDateOnChange={handleNewDateOnChange}
        newVisibility={newVisibility}
        handleNewVisibilityOnChange={handleNewVisibilityOnChange}
        newWeather={newWeather}
        handleNewWeatherOnChange={handleNewWeatherOnChange}
        newComment={newComment}
        handleNewCommentOnChange={handleNewCommentOnChange}
      />
      {diaries.map((diaryValue) => <DiaryComponent key={diaryValue.id} diary={diaryValue}/>)}
    </div>
  );
};

export default App;
