import { Avatar, AvatarProps } from '@mantine/core';
import { useUser } from '../store/useAuth';
import { IUser } from '../resources/types';

const UserAvatar = (props: Omit<AvatarProps, 'alt' | 'src'> & { user?: IUser }) => {
  const { user, ...rest } = props;

  const { user: authUser } = useUser();
  const currentUser = user ?? authUser;

  return (
    <Avatar
      src={null}
      alt={`Profile avatar of ${currentUser.firstName} ${currentUser.lastName}`}
      {...rest}
    >
      {currentUser.firstName[0]} {currentUser.lastName[0]}
    </Avatar>
  );
};

export default UserAvatar;
