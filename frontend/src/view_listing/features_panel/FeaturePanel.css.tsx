import makeStyles from '@material-ui/core/styles/makeStyles';
import { Theme, createStyles } from '@material-ui/core';
export const FeaturePanelStyles = makeStyles((theme: Theme) => createStyles({
    listItem : {
        padding: "0 !important",
    },
    details: { 
        borderTop: "solid 1px #eee",
    },
    summary: {
        paddingLeft: 0,
    },
    grid: {
        marginTop: theme.spacing(2),
    }
}))