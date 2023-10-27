import React from 'react';
import {Card} from 'react-native-paper';

const CardPaper = ({children}: any) => {
  return (
    <Card
      style={{
        marginVertical: 20,
      }}>
      {children}
    </Card>
  );
};

export const CardContent = ({children}: any) => {
  return <Card.Content style={{marginVertical: 10}}>{children}</Card.Content>;
};

export default CardPaper;
