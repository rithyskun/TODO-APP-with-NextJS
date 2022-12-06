import React from "react";

type ItemListProps = {
  children: React.ReactNode;
  handleRemoveCompleted(id: string): void;
};
const List = ({ children, handleRemoveCompleted }: ItemListProps) => {
  return (
    <>
      {children && (
        <section>
          <div>{children}</div>
          <a href="#" role="button" onClick={() => handleRemoveCompleted}>
            Remove complete items
          </a>
        </section>
      )}
    </>
  );
};

export default List;
