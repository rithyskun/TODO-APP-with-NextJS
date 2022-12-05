import React, { Component, ReactNode } from "react";
import { Todo } from "../../../types/type";

type Props = {
  onSubmit(): void;
};
const FormTodo = ({ onSubmit }: Props) => {
  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        name="todo"
        id="todo"
        placeholder="add a todo item"
      />
    </form>
  );
};

export default FormTodo;
