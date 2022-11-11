import { Heading } from "../../components/layout/Headings";
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Banner from '../../components/profile/Banner';
import Avatar from '../../components/profile/Avatar';
import User from "../../utils/user";
import Loading from "../../components/ux/Loading";
import RenderUpdateFrom from "../../components/profile/UpdateForm";

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
          {user.avatar ? <Avatar src={user.avatar} alt={user.name} /> 
          : <div className='profile--avatar'><ion-icon name="person"></ion-icon></div> }
          <Heading content={user.name}/>
        </div>
        <div className='group'>
          <Button className='btn'>Following {user._count.following}</Button>
          <Button className='btn'>Followers {user._count.followers}</Button>
          <RenderUpdateFrom />
        </div>
      </div>
      <main>
        <div className=''>
          {user._count.posts} Posts
        </div>
      </main>
    </Container>
    </>
  );
}
