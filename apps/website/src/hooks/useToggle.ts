import { useCallback, useState } from 'react';

function useToggle(
  initialValue?: boolean
): [boolean | undefined, () => void, React.Dispatch<React.SetStateAction<boolean | undefined>>] {
  const [state, setState] = useState(initialValue);

  const toggle = useCallback(() => {
    setState((prevState) => !prevState);
  }, []);

  return [state, toggle, setState];
}

export default useToggle;
