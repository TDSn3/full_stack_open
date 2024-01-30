import axios from 'axios';
import { Diary, NewDiary } from './types';

const url = 'http://localhost:3000/api/diaries';

export const getAllDiaries = () => {
	return (
		axios
			.get<Diary[]>(url)
			.then((response) => response.data)
	);
};

export const addNewDiary = (diaryToAdd: NewDiary): Promise<Diary> => {
	return (axios
			.post<Diary>(url, diaryToAdd)
			.then((response) => response.data)
	);
};
