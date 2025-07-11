type Props = {
  children: React.ReactNode;
  onSubmit?: React.FormEventHandler<HTMLFormElement>;
}

export const Form: React.FC<Props> = ({children, onSubmit }) => {
  return (
    <form onSubmit={onSubmit}>
      {children}
    </form>
  )
}