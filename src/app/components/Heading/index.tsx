type Props = {
  title: string;
  description: string;
}

export const Heading: React.FC<Props> = ({title, description}) => {
  return (
    <div className="heading">
      <h2 className="title">{title}</h2>
      <p className="description">{description}</p>
    </div>
  )
}