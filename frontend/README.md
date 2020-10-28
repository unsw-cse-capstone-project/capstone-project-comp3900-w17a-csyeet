# Scripts

```
yarn start
```

To open the website. Make you you have backened set up too otherwise calls will not work.

```
yarn run storybook
```

To view indiviaul components

## .ENV

See [here](https://stackoverflow.com/questions/42182577/is-it-possible-to-use-dotenv-in-a-react-project) for more detail

.env

```
REACT_APP_KEY=your-very-secret-key
```

Note: Envrionment variables must begin `REACT_APP_`

app.tsx

```
const key = process.env.REACT_APP_KEY
```
