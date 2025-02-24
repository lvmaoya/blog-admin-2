import { Plugin, ButtonView } from 'ckeditor5';


export default class SubmitPlugin extends Plugin {init() {
  const editor = this.editor;

  // Register the toolbar button.
  editor.ui.componentFactory.add( 'menuBar:myCustomButton', locale => {
    const view = new ButtonView(locale);

    view.set( {
      label: 'My Custom Button',
      withText: true,
      tooltip: true
    } );

    // Execute a command when the button is clicked.
    view.on( 'execute', () => {
      editor.execute('myCustomCommand');
    } );

    return view;
  } );

  editor.ui.extendMenuBar( {
    group: {
      groupId: 'myCustomButton',
      items: [
        'menuBar:myCustomButton'
      ]
    },
    position: 'start:help'
  } );
  }
}
