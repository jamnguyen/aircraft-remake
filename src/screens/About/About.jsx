import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Button } from '../../components';
import { SCREEN_NAME, setLoading, setScreen } from '../../reducers/screen-manager';
import { useDispatch } from '../../utils/hooks';
import styles from './About.module.scss';

const About = () => {
  const dispatch = useDispatch();

  React.useEffect(() => {
    setLoading(dispatch, false);
  }, []);

  const onBack = () => {
    setScreen(dispatch, SCREEN_NAME.MAIN_MENU);
    setLoading(dispatch, true);
  }

  return (
    <div className={styles.container}>
      <h1>About</h1>
      <p>
        Duis tempus vel massa nec placerat. Donec eget libero massa. Integer sodales lectus elit, non mollis dui feugiat vitae. Curabitur ullamcorper rutrum lorem vitae finibus.
        <br />
        <br />
        Vestibulum a faucibus dui. Maecenas aliquam dolor vitae quam gravida facilisis. Morbi varius faucibus quam, et ultricies sapien sollicitudin non. Etiam ac fermentum urna, sit amet tempus purus. Nullam consequat ligula in sodales maximus. Donec eget risus at risus feugiat dictum. Cras congue ultricies pellentesque.
      </p>
      <Button
        className={styles.button}
        onClick={onBack}
      ><FaArrowLeft className={styles.icon} />Back</Button>
    </div>
  );
};

export default About;
