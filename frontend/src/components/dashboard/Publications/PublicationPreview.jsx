import React, { useState } from 'react';
import styled from 'styled-components';

const PreviewContainer = styled.div`
  margin: 0 auto;
  background-color: #f8f9fa;
  border-radius: 1px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: auto;
  font-family: ${props => props.fontFamily};
`;

const Title = styled.h2`
  color: #343a40;
  text-align: ${props => props.textAlign};
  font-size: 24px;
  margin-bottom: 20px;
  font-weight: ${props => props.fontWeight};
`;

const PropertyLabel = styled.strong`
  color: #00000;
  display: block;
  font-size: 18px;
  margin-top: 10px;
`;

const PropertyValue = styled.p`
  font-size: 16px;
`;

const MultimediaContainer = styled.div`
  margin-top: 20px;
  text-align: ${props => props.imageAlign};
`;

const MultimediaList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

function PublicationPreview({
  titulo, descripcion, multimedia, estado, tipo
}) {
  const [fontFamily, setFontFamily] = useState('Arial');
  const [fontWeight, setFontWeight] = useState('normal');
  const [textAlign, setTextAlign] = useState('center');
  const [imageAlign, setImageAlign] = useState('center');

  return (
    <PreviewContainer fontFamily={fontFamily}>
      <Title fontWeight={fontWeight} textAlign={textAlign}>Vista Previa</Title>
      <PropertyLabel>{titulo}</PropertyLabel>
      <MultimediaContainer imageAlign={imageAlign}>
        <img src={"https://elpais.bo/img/images_1200/contents/2020/06/16/c2485658-d073-4fa4-be13-0877953f3647.jpg"} alt={"No hay multimedia"} />
      </MultimediaContainer>
      <PropertyValue>{descripcion}</PropertyValue>
      <PropertyLabel>{estado}</PropertyLabel>
      <PropertyValue>{tipo}</PropertyValue>
    </PreviewContainer>
  );
}

export default PublicationPreview;
