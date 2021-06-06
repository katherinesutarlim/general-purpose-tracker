import React from 'react';
import {
  View, Text, TouchableOpacity, FlatList, StyleSheet,
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { setItems } from '../store/trackedSlice';
import { getTrackedItems } from '../store/selectors';
import { getStateFromStore } from '../services/storage';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#4c4c4c',
  },
  list: {
    height: '100%',
    backgroundColor: '#777777',
  },
  listItem: {
    flexDirection: 'row',
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 8,
    marginTop: 4,
    borderRadius: 8,
  },
  listItemIcon: {
    marginLeft: 16,
    marginRight: 8,
  },
  listItemTitle: {
    fontSize: 18,
  },
  addButton: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 24,
  },
});

const renderListItem = ({ item }) => (
  <View style={styles.listItem}>
    <FontAwesomeIcon
      icon={icons[item.icon]}
      style={styles.listItemIcon}
      size={24}
      color={item.color}
    />
    <Text style={styles.listItemTitle}>{ item.title }</Text>
  </View>
);

const ListScreen = ({ navigation, trackedItems, setItemsInStore }) => {
  React.useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getStateFromStore('tracked', 'trackedItems').then((data) => setItemsInStore(data));
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);
  return (
    <View style={styles.screen}>
      <FlatList
        data={trackedItems}
        renderItem={renderListItem}
        keyExtractor={(item) => item.title}
        style={styles.list}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Form')} style={styles.addButton}>
        <FontAwesomeIcon icon={icons.faPlus} size={32} />
      </TouchableOpacity>
    </View>
  );
};
const mapStateToProps = (state) => ({
  trackedItems: getTrackedItems(state),
});

const mapDispatchToProps = (dispatch) => ({
  setItemsInStore: (items) => dispatch(setItems(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ListScreen);
