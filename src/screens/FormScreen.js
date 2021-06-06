import React, { PureComponent } from 'react';
import {
  TouchableOpacity,
  View, Text, StyleSheet, TextInput, FlatList, Modal,
  Alert,
} from 'react-native';
import * as icons from '@fortawesome/free-solid-svg-icons';
import DropDownPicker from 'react-native-dropdown-picker';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import ColorPicker from 'react-native-wheel-color-picker';
import { connect } from 'react-redux';
import ItemType from '../models/types';
import { addItem } from '../store/trackedSlice';
import { storeState } from '../services/storage';
import TimeUnit from '../models/timeUnit';

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#4c4c4c',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  formSection: {
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 16,
    marginTop: 8,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  inputLabel: {
    fontSize: 16,
    width: 48,
  },
  input: {
    borderBottomColor: '#9c9c9c',
    borderBottomWidth: 1,
    fontSize: 16,
    padding: 4,
    textAlign: 'left',
    flex: 1,
  },
  dropDownContainer: {
    flex: 1,
  },
  dropDown: {
    borderColor: '#9c9c9c',
  },
  dropDownListBox: {
    borderColor: 'white',
  },
  inputMiddle: {
    flex: 0.5,
    marginRight: 8,
  },
  chosenIcon: {
    marginRight: 8,
  },
  chooseIconButton: {
    borderColor: '#9c9c9c',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 8,
  },
  chooseIconTitle: {
    flex: 1,
    marginBottom: 16,
    marginLeft: 8,
    fontSize: 16,
  },
  createButton: {
    backgroundColor: '#e6e6e6',
    marginTop: 16,
    paddingVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
    bottom: 24,
  },
  createButtonText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginTop: 80,
    marginBottom: 64,
    padding: 16,
    borderRadius: 8,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  closeIcon: {
    position: 'relative',
    top: -8,
    padding: 4,
  },
  iconTouchableInList: {
    margin: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorPicker: {
    marginHorizontal: 16,
    marginVertical: 16,
    backgroundColor: 'white',
  },
  chosenColor: {
    height: 36,
    width: 36,
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  colorDoneButton: {
    backgroundColor: '#c8c8c8',
    flex: 1,
    height: 36,
    marginRight: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorDoneButtonText: {
    textAlign: 'center',
  },
});

class FormScreen extends PureComponent {
  constructor() {
    super();
    this.state = {
      title: '',
      type: '',
      typeOpen: false,
      unit: '',
      chooseIconOpen: false,
      chosenIcon: 'faCircle',
      chosenColor: '#888888',
      tempColor: '#888888',
      chooseColor: false,
      frequencyValue: 1,
      frequencyUnitOpen: false,
      frequencyUnit: TimeUnit.Day.unit,
    };
  }

  setTypeValue = (callback) => {
    this.setState((state) => ({
      type: callback(state.type),
    }));
  }

  setFrequencyUnitValue = (callback) => {
    this.setState((state) => ({
      frequencyUnit: callback(state.frequencyUnit),
    }));
  }

  createItem = () => {
    const {
      title, type, unit, chosenIcon, chosenColor, frequencyValue, frequencyUnit,
    } = this.state;
    const { navigation, addItemToStore } = this.props;
    if (!title || !type) {
      Alert.alert("Can't add item", 'Sorry, you need to fill out all the fields.', [{
        text: 'OK',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      }]);
    } else {
      const newItem = {
        title, type, icon: chosenIcon, color: chosenColor, frequencyValue, frequencyUnit,
      };
      if (type === ItemType.Numeric.getValue()) {
        newItem.unit = unit;
      }
      addItemToStore(newItem);
      navigation.navigate('List');
    }
  }

  render() {
    const {
      title,
      type,
      typeOpen,
      unit,
      chooseIconOpen,
      chosenIcon,
      chosenColor,
      tempColor,
      chooseColor,
      frequencyValue,
      frequencyUnitOpen,
      frequencyUnit,
    } = this.state;
    return (
      <View style={styles.screen}>
        <View style={styles.formSection}>
          <View style={styles.row}>
            <Text style={styles.inputLabel}>Title</Text>
            <TextInput
              value={title}
              onChangeText={(text) => this.setState({ title: text })}
              style={styles.input}
              placeholder="Title"
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.inputLabel}>Type</Text>
            <DropDownPicker
              items={ItemType.getList()}
              open={typeOpen}
              setOpen={(open) => this.setState({ typeOpen: open })}
              value={type}
              setValue={this.setTypeValue}
              containerStyle={styles.dropDownContainer}
              style={styles.dropDown}
              dropDownContainerStyle={styles.dropDownListBox}
              zIndex={2000}
              zIndexInverse={2000}
            />
          </View>
          {type === ItemType.Numeric.getValue() ? (
            <View style={styles.row}>
              <Text style={styles.inputLabel}>Unit</Text>
              <TextInput
                value={unit}
                onChangeText={(text) => this.setState({ unit: text })}
                style={styles.input}
                placeholder="minutes, km, etc."
              />
            </View>
          ) : null}
          <View style={styles.row}>
            <Text style={styles.inputLabel}>Frequency</Text>
            <TextInput
              value={frequencyValue}
              onChangeText={(text) => this.setState({ frequencyValue: parseInt(text, 10) })}
              style={[styles.input, styles.inputMiddle]}
              placeholder="1"
            />
            <DropDownPicker
              items={TimeUnit.getList()}
              open={frequencyUnitOpen}
              setOpen={(open) => this.setState({ frequencyUnitOpen: open })}
              value={frequencyUnit}
              setValue={this.setFrequencyUnitValue}
              containerStyle={styles.dropDownContainer}
              style={styles.dropDown}
              dropDownContainerStyle={styles.dropDownListBox}
              zIndex={1000}
              zIndexInverse={1000}
            />
          </View>
          <View style={styles.row}>
            <Text style={styles.inputLabel}>Icon</Text>
            {chosenIcon ? (
              <FontAwesomeIcon
                icon={icons[chosenIcon]}
                size={30}
                style={styles.chosenIcon}
                color={chosenColor}
              />
            ) : null}
            <TouchableOpacity
              style={styles.chooseIconButton}
              onPress={() => this.setState({ chooseIconOpen: true })}
            >
              <Text>Choose Icon</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.chooseIconButton}
              onPress={() => this.setState({ chooseColor: true })}
            >
              <Text>Choose Color</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity style={styles.createButton} onPress={this.createItem}>
          <Text style={styles.createButtonText}>Create</Text>
        </TouchableOpacity>
        <Modal
          visible={chooseIconOpen}
          style={styles.modal}
          transparent
          onRequestClose={() => this.setState({ chooseIconOpen: false })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.row}>
              <Text style={styles.chooseIconTitle}>Choose an icon...</Text>
              <TouchableOpacity onPress={() => this.setState({ chooseIconOpen: false })}>
                <FontAwesomeIcon icon={icons.faTimesCircle} size={30} style={styles.closeIcon} color="#9d9d9d" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={Object.keys(icons).filter((key) => !key.startsWith('fas') && key.startsWith('fa'))}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.iconTouchableInList}
                  onPress={() => this.setState({ chosenIcon: item, chooseIconOpen: false })}
                >
                  <FontAwesomeIcon icon={icons[item]} size={32} color={chosenColor} />
                </TouchableOpacity>
              )}
              numColumns={4}
              horizontal={false}
              keyExtractor={(key) => key}
            />
          </View>
        </Modal>
        <Modal
          visible={chooseColor}
          style={styles.modal}
          transparent
          onRequestClose={() => this.setState({ chooseColor: false })}
        >
          <View style={styles.modalContainer}>
            <View style={styles.row}>
              <Text style={styles.chooseIconTitle}>Choose color...</Text>
              <TouchableOpacity onPress={() => this.setState({ chooseColor: false })}>
                <FontAwesomeIcon icon={icons.faTimesCircle} size={30} style={styles.closeIcon} color="#9d9d9d" />
              </TouchableOpacity>
            </View>
            <ColorPicker
              // ref={r => { this.picker = r }}
              color={tempColor}
              swatches={false}
              // swatchesOnly={this.state.swatchesOnly}
              onColorChange={(newColor) => this.setState({ tempColor: newColor })}
              // onColorChangeComplete={this.onColorChangeComplete}
              thumbSize={40}
              sliderSize={40}
              noSnap
              row={false}
              style={styles.colorPicker}
              // swatchesLast={this.state.swatchesLast}
              // swatches={this.state.swatchesEnabled}
              // discrete={this.state.disc}
            />
            <View style={styles.row}>
              <View style={[styles.chosenColor, { backgroundColor: tempColor }]} />
              <TouchableOpacity
                style={styles.colorDoneButton}
                onPress={() => this.setState({ chosenColor: tempColor, chooseColor: false })}
              >
                <Text>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addItemToStore: (newItem) => {
    dispatch(addItem(newItem));
    storeState('tracked', 'trackedItems');
  },
});

export default connect(null, mapDispatchToProps)(FormScreen);
