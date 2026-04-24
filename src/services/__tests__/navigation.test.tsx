import { RouteProp } from '@react-navigation/native';
import { getTabStackIcon } from '../navigation';

const makeRoute = (name: string): RouteProp<any, any> =>
  ({ key: name, name } as RouteProp<any, any>);

describe('getTabStackIcon', () => {
  it.skip('Should get the documents Icon', () => {
    const results = {
      documents: {
        inactive: getTabStackIcon(makeRoute('Documents'))({ color: 'blue' }),
        focused: getTabStackIcon(makeRoute('Documents'))({ color: 'blue' }),
      },
      chat: {
        inactive: getTabStackIcon(makeRoute('Chat'))({ color: 'blue' }),
        focused: getTabStackIcon(makeRoute('Chat'))({ color: 'blue' }),
      },
      contacts: {
        inactive: getTabStackIcon(makeRoute('Contacts'))({ color: 'blue' }),
        focused: getTabStackIcon(makeRoute('Contacts'))({ color: 'blue' }),
      },
      notes: {
        inactive: getTabStackIcon(makeRoute('Notes'))({ color: 'blue' }),
        focused: getTabStackIcon(makeRoute('Notes'))({ color: 'blue' }),
      },
      events: {
        inactive: getTabStackIcon(makeRoute('Events'))({ color: 'blue' }),
        focused: getTabStackIcon(makeRoute('Events'))({ color: 'blue' }),
      },
      unknown: {
        inactive: getTabStackIcon(makeRoute('UnknownTab'))({ color: 'blue' }),
        focused: getTabStackIcon(makeRoute('UnknownTab'))({ color: 'blue' }),
      },
    };
    Object.keys(results).forEach((screenKey: string) => {
      expect(results[screenKey].inactive.props.solid).toBeFalsy();
      expect(results[screenKey].focused.props.solid).toBeTruthy();
      expect(results[screenKey].inactive.props.size).toBe(25);
      expect(results[screenKey].focused.props.size).toBe(25);
      expect(results[screenKey].inactive.props.color).toBe('blue');
      expect(results[screenKey].focused.props.color).toBe('blue');
    });
    expect(results.documents.inactive.props.name).toBe('folder-open');
    expect(results.documents.focused.props.name).toBe('folder-open');
    expect(results.chat.inactive.props.name).toBe('comment-alt');
    expect(results.chat.focused.props.name).toBe('comment-alt');
    expect(results.contacts.inactive.props.name).toBe('address-book');
    expect(results.contacts.focused.props.name).toBe('address-book');
    expect(results.notes.inactive.props.name).toBe('clipboard');
    expect(results.notes.focused.props.name).toBe('clipboard');
    expect(results.events.inactive.props.name).toBe('calendar-alt');
    expect(results.events.focused.props.name).toBe('calendar-alt');
    expect(results.unknown.inactive.props.name).toBe('question');
    expect(results.unknown.focused.props.name).toBe('question');
  });
});
