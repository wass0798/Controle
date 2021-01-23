
  import React, { Component } from 'react';
  import { Container, Header, Content, List, ListItem, Thumbnail, Text, Left, Body, Right, Button } from 'native-base';
  import mesdemande from './mesdemande'
  import { NavigationContainer } from '@react-navigation/native';

  import Dataitem from './Dataitem'
  import {Icon, Title } from 'native-base';


  export default class ListeArticle extends Component {
  
    render() {
      return (
        <Container>
            <Header>
       
         
          <Body>
            <Title>Les Articles </Title>
          </Body>
         
        </Header>
          <Content>
            <List>
            <Dataitem />
            </List>
          </Content>
        </Container>
      );
    }
  }