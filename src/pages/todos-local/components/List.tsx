import React from "react";

type ItemListProps = {
  title: string;
  children: React.ReactNode;
  handleRemoveCompleted(id: string): void;
};
const List = ({ title, children, handleRemoveCompleted }: ItemListProps) => {
  return (
    <>
      {children && (
        <section>
          {title && <h4>{title}</h4>}
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
