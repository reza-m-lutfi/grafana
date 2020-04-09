import React, { useMemo } from 'react';
import { set as lodashSet, get as lodashGet } from 'lodash';
import { PanelPlugin } from '@grafana/data';
import { Forms } from '@grafana/ui';

interface PanelOptionsEditorProps<TOptions> {
  plugin: PanelPlugin;
  options: TOptions;
  onChange: (options: TOptions) => void;
}

export const PanelOptionsEditor: React.FC<PanelOptionsEditorProps<any>> = ({ plugin, options, onChange }) => {
  const optionEditors = useMemo(() => plugin.optionEditors, [plugin]);

  const onOptionChange = (key: string, value: any) => {
    const newOptions = lodashSet({ ...options }, key, value);
    onChange(newOptions);
  };

  return (
    <>
      {optionEditors.list().map(e => {
        if (e.showIf && !e.showIf(options)) {
          return null;
        }

        return (
          <Forms.Field label={e.name} description={e.description} key={e.id}>
            <e.editor value={lodashGet(options, e.path)} onChange={value => onOptionChange(e.path, value)} item={e} />
          </Forms.Field>
        );
      })}
    </>
  );
};
