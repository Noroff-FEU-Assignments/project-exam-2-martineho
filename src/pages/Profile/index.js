import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Banner from '../../components/profile/Banner';
import Avatar from '../../components/profile/Avatar';
import AvatarPlaceholder from "../../components/profile/AvatarPlaceholder";
import User from "../../utils/user";
import Loading from "../../components/ux/Loading";
import RenderUpdateFrom from "../../components/profile/UpdateForm";
import ProfilePostList from "../../components/profile/ProfilePostList";

export default function Profile() {
  const user = User();

  if (user._count === undefined) {
    return <Loading /> //don't know if this is the right way of doing it but its working for now
  }

  return (
    <>
    <Container>
      {user.banner ? <Banner src={user.banner} alt={user.name} /> : <div className='profile--banner'></div>}
      <div className='profile__header'>
        <div className='group'>
          {user.avatar ? <Avatar className='avatar--big' src={user.avatar} alt='avatar' /> 
            : <AvatarPlaceholder className='avatar-placeholder--big' /> }
          <Heading style={{fontSize: '1.1'}} content={user.name}/>
          <RenderUpdateFrom />
        </div>
        <div className='group'>
          <div className='post-count'> {user._count.posts} posts </div>
          <Button className='btn-secondary'>Following {user._count.following}</Button>
          <Button className='btn-secondary'>Followers {user._count.followers}</Button>
        </div>
      </div>
      <main className="profile-posts">
        <ProfilePostList />
      </main>
    </Container>
    </>
  );
}
