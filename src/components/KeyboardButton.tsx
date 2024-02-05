import { Button, ButtonProps, Grid } from '@mantine/core';
import { KeyType } from '../resources/keyboard';

const KeyboardButton = (
  props: ButtonProps & {
    keyType: KeyType;
    span: number;
  } & React.ButtonHTMLAttributes<HTMLButtonElement>
) => {
  return (
    <Grid.Col span={props.span}>
      <Button
        fullWidth
        size='xs'
        p={1}
        radius='xl'
        variant='outline'
        {...props}
        onClick={props.onClick}
      >
        {props.children}
      </Button>
    </Grid.Col>
  );
};

export default KeyboardButton;
