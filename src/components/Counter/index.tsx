import { Box, Button } from "@chakra-ui/react";
import { RootState } from "@common/store";
import { ACTIONS } from "@common/store/sagaActions";
import { useDispatch, useSelector } from "react-redux";

interface CounterProps {}

const Counter: React.FC<CounterProps> = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();
  return (
    <Box gap="20px">
      <h2>Counter</h2>
      <Button onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
        Decrement
      </Button>
      {count}
      <Button
        onClick={() =>
          dispatch({ type: ACTIONS.INCREMENT, payload: "I AM INC" })
        }
      >
        Increment
      </Button>
    </Box>
  );
};

export default Counter;
