import React, { useState } from 'react';
import { ModuleType } from 'Entity';
import { makeStyles } from '@material-ui/styles';
import ModuleFormDialog from './ModuleFormDialog';
import {
  Chip,
  Theme,
  Button,
  Checkbox,
  FormControlLabel,
} from '@material-ui/core';

interface Props {
  modules: boolean;
  modulesList: ModuleType[];
  onAddModule: (mod: ModuleType) => void;
  onRemoveModule: (entityName: string) => void;
}

const useStyles = makeStyles((theme: Theme) => ({
  checkboxRoot: {
    marginRight: theme.spacing(1),
  },
  chipRoot: {
    cursor: 'pointer',
    margin: theme.spacing(0.5),
  },
  chipsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    paddingBottom: theme.spacing(1),
  },
  firstRow: {
    display: 'flex',
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
}));

export default function Modules(props: Props) {
  const {
    modules,
    modulesList,
    onAddModule,
    onRemoveModule,
  } = props;
  const [moduleDialogOpen, setModuleDialogOpen] = useState(true);
  const classes = useStyles({});

  return (
    <div className={classes.root}>
      <div className={classes.firstRow}>
        <FormControlLabel
          label="Modules"
          control={
            <Checkbox
            name="controllers"
            value={modules}
            checked={modules}
            />
          }
          />
        <Button
          color="secondary"
          onClick={() => setModuleDialogOpen(true)}
        >
          Adicionar módulo extra
        </Button>
      </div>
      <div className={classes.chipsContainer}>
        {modulesList.map(mod => (
          <Chip
            color="secondary"
            key={mod.entityName}
            label={mod.entityName}
            className={classes.chipRoot}
            onDelete={() => onRemoveModule(mod.entityName)}
          />
        ))}
      </div>
      <ModuleFormDialog
        open={moduleDialogOpen}
        onAddModule={onAddModule}
        onClose={() => setModuleDialogOpen(false)}
      />
    </div>
  );
}
