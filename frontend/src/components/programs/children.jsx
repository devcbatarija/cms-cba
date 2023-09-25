import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
      margin: theme.spacing(2),
      textAlign: 'center',
      width: '80%',
    },
    paper: {
      width: theme.spacing(150),
      textAlign: 'center',
      padding: theme.spacing(2),
      margin: theme.spacing(2),
      backgroundColor: theme.palette.grey[5],
    },
    table: {
      minWidth: 650,
    },
  }));

export default function ProgramChildren() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h2" gutterBottom>
          ¿Qué aprendo en este programa?
        </Typography>
        <List>
          <ListItem>Aprenderás a presentarte y presentar a tus amigos, dar información personal, hablar de tu familia, describir personas y objetos.</ListItem>
          <ListItem>Aumentarás tu vocabulario y hablarás sobre planes futuros.</ListItem>
          <ListItem>Te referirás a experiencias en el colegio, con tu familia y amigos.</ListItem>
          <ListItem>Podrás relatar experiencias pasadas, futuras, entender y contar historias, escribir correos electrónicos sencillos y chatear en la Web.</ListItem>
        </List>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h2" gutterBottom>
          Características del curso
        </Typography>
        <Typography paragraph>
          Los programas están organizados en diferentes aéreas de habilidad para facilitar el estudio del idioma: Gramática,
          Vocabulario, Pronunciación, Escritura y Redacción. El programa que ofrecemos para niños de entre 7 y 10 años es el
          English for Kids, el mismo comprende 18 módulos bimestrales. La enseñanza de este programa se basa en juegos, canciones,
          adivinanzas, etc. lo cual motiva al niño para que asimile mucho más fácil el idioma. Los cursos son de 1 ½ hora diaria,
          de lunes a viernes y están disponibles en la Casa Central, en horarios de la tarde de 14:45 a16:15 y de 16:25 a 17:55.
        </Typography>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h2" gutterBottom>
          Precios
        </Typography>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Curso</TableCell>
                <TableCell>Edificio Tarija</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Basic Kids</TableCell>
                <TableCell>575 Bs / Módulo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Intermediate Kids</TableCell>
                <TableCell>575 Bs / Módulo</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Consolidation Kids</TableCell>
                <TableCell>600 Bs / Módulo</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
      <Paper className={classes.paper}>
        <Typography variant="h5" component="h2" gutterBottom>
          Requisitos de Inscripción
        </Typography>
        <List>
          <ListItem>Fotocopia de CI o Certificado de Nacimiento</ListItem>
          <ListItem>Fotocopia libreta del ultimo curso aprobado</ListItem>
          <ListItem>Visa de estudios (Solo extranjeros)</ListItem>
        </List>
      </Paper>
    </div>
  );
}
