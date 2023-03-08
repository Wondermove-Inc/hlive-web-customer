import Lottie from 'react-lottie';
import lottie_spinner from '@lotties/lottie_spinner.json';

export const Spinner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: lottie_spinner,
  };

  return (
    <>
      <Lottie isClickToPauseDisabled options={defaultOptions} />
    </>
  );
};
