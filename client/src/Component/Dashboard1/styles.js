import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  cartContent: {
    paddingTop: 0,
  },
  divider: {
    margin: '20px 0',
  },
  CardHeader: {
    color: '#1eb4ff',
  },
  subheader: {
    color: 'black',
  },
  root: {
    backgroundColor: '#E9F1FA',
  },
  radioGroup: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '-10px',
  },
  button: {
    marginTop: '20px',
    marginRight: '60%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Typography: {
    color: '#1eb4ff',
  },
}));
