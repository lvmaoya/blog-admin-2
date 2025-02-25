import { Plugin, ButtonView } from 'ckeditor5';


export default class SubmitPlugin extends Plugin {
  init() {
    const editor = this.editor;

    // Register the toolbar button.
    editor.ui.componentFactory.add('menuBar:myCustomButton', locale => {
      const view = new ButtonView(locale);

      view.set({
        label: 'My Custom Button',
        withText: true,
        tooltip: true
      });

      // Execute a command when the button is clicked.
      view.on('execute', () => {
        editor.execute('myCustomCommand');
      });

      return view;
    });

    editor.ui.extendMenuBar({
      menu: {
        menuId: 'my-menu',
        label: 'My menu',
        groups: [
          {
            groupId: 'my-buttons',
            items: [
              'myButton',
              'menuBar:italic',
              'menuBar:underline'
            ]
          }
        ]
      },
      position: 'end'
    });
  }
}
