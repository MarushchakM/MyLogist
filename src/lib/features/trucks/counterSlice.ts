// src/redux/slices/counterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 1. Визначення типу стану для слайса
interface CounterState {
  value: number;
}

// 2. Початковий стан слайса
const initialState: CounterState = {
  value: 0,
};

// 3. Створення слайса
export const counterSlice = createSlice({
  name: 'counter', // Ім'я слайса. Використовується як префікс для action types
  initialState,
  reducers: {
    // Редьюсер для збільшення лічильника
    increment: (state) => {
      state.value += 1; // RTK дозволяє "мутувати" стан напряму завдяки Immer
    },
    // Редьюсер для зменшення лічильника
    decrement: (state) => {
      state.value -= 1;
    },
    // Редьюсер для збільшення лічильника на певне значення (payload)
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    // Редьюсер для скидання лічильника
    reset: (state) => {
      state.value = 0;
    },
  },
});

// Експорт екшн-кріейторів, згенерованих createSlice
export const { increment, decrement, incrementByAmount, reset } = counterSlice.actions;

// Експорт редьюсера слайса
export default counterSlice.reducer;