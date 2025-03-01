import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootState } from './store'; // Adjust the path to your store file

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 