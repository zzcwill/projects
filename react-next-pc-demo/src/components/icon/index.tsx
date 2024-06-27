import classNames from 'classnames';

interface IProps {
  name: string;
  className?: string;
  onClick?: () => void;
}

export const Icon = ({ name, className, onClick }: IProps) => {
  return (
    <svg onClick={onClick} className={classNames('icon', className)}>
      <use href={`#${name}`}></use>
    </svg>
  );
};
