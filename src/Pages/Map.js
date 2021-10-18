import React, {useState, useEffect} from "react";
import MapPin from "../Assets/MapPin";
import {
  Box,
  Flex,
  Text,
  Input,
  Button,
  SunIcon,
  Spinner,
  MoonIcon,
  CloseIcon,
  SearchIcon,
  HamburgerIcon
} from "native-base";
import { get } from 'lodash';
import * as Location from 'expo-location';
import {getRandomColor} from "../utilities";
import TrashIcon from "../Assets/TrashIcon";
import MapView, {Marker} from "react-native-maps";
import SimpleRequestHandler from "../Services/positionStack";

const Map = () => {
  let _mapView = MapView;

  const [search, setSearch] = useState('');
  const [markers, setMarkers] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [mapType, setMapType] = useState('standard');
  const [regionState, setRegionState] = useState(null);

  const getUserRegion = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('permission error')
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    setRegionState({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta:  0.00922 * 1.5,
      longitudeDelta: 0.00421 * 1.5
    })
  }

  useEffect(() => {
    getUserRegion()
  }, [])

  const handleMarkerPosition = (e) => {
    if (markers.length < 10) {
      setMarkers([...markers, { latlng: e.nativeEvent.coordinate, color: getRandomColor() }])
    }
  }

  const clearMarkers = () => {
    setMarkers([]);
  }

  const toggleMenu = () => {
    setOpenMenu(!openMenu)
  }

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  const handleSearch = () => {
    if (search && search.length >= 3) {
      SimpleRequestHandler('forward', search)
        .then(({data}) => {
          const response = get(data, 'data[0]', '')
          _mapView.animateCamera({
            pitch: 0,
            zoom: 5000,
            altitude: 5000,
            center: {
              latitude: response.latitude,
              longitude: response.longitude,
              latitudeDelta:  0.00922 * 1.5,
              longitudeDelta: 0.00421 * 1.5
            }
          })
        })
        .catch(error => console.log(error))
    }
  }

  const handleQueryChange = (text) => {
    setSearch(text)
  }

  return (
    <Box flex={1}>
      {regionState === null ? (
        <Spinner />
      ) : (
        <Flex flex={1}>
          <Input
            h={10}
            mt={12}
            top={0}
            left={4}
            right={4}
            zIndex={999}
            rounded='lg'
            fontSize='lg'
            value={search}
            variant="unstyled"
            position='absolute'
            onChangeText={handleQueryChange}
            placeholder="Digite um endereço ou CEP"
            bgColor={
              darkMode ? 'rgba(0, 0 ,0, 0.8)' : 'rgba(255, 255 ,255, 0.8)'
            }
            color={darkMode ? '#FFF' : '#000'}
            InputRightElement={
              <Button size="lg" mx="1" onPress={handleSearch}>
                <SearchIcon size='4' />
              </Button>
            }
          />
          <MapView
            mapType={mapType}
            showsCompass={false}
            loadingEnabled={true}
            showsUserLocation={true}
            initialRegion={regionState}
            loadingIndicatorColor="#666"
            style={{flex: 1, zIndex: 20}}
            ref = {(mapView) => { _mapView = mapView; }}
            userInterfaceStyle={darkMode ? 'dark' : 'light'}
            onLongPress={(e) => handleMarkerPosition(e)}
          >
            {markers.map((point, key) => (
              <Marker key={key} title={`Marcação ${key + 1}`} coordinate={point.latlng}>
                <MapPin color={point.color} />
              </Marker>
            ))}
          </MapView>
          <Flex
            px={1}
            h={10}
            mb={16}
            right={4}
            bottom={0}
            zIndex={999}
            rounded='lg'
            position='absolute'
            alignItems='center'
            flexDirection='row'
            justifyContent='flex-end'
            bgColor={
              darkMode ? 'rgba(0, 0 ,0, 0.6)' : 'rgba(255, 255 ,255, 0.6)'
            }
          >
            {openMenu && (
              <Flex flexDirection='row'>
                <Button
                  m={0}
                  onPress={() => {setMapType('standard')}}
                  bgColor={mapType === 'standard' ? '#0891b2' : 'transparent'}
                >
                  <Text color={darkMode ? '#FFF' : '#000'}>
                    Ruas
                  </Text>
                </Button>
                <Button
                  m={0}
                  onPress={() => {setMapType('satellite')}}
                  bgColor={mapType === 'satellite' ? '#0891b2' : 'transparent'}
                >
                  <Text color={darkMode ? '#FFF' : '#000'}>
                    Satelite
                  </Text>
                </Button>
                <Button
                  m={0}
                  onPress={() => {setMapType('hybrid')}}
                  bgColor={mapType === 'hybrid' ? '#0891b2' : 'transparent'}
                >
                  <Text color={darkMode ? '#FFF' : '#000'}>
                    Hibrido
                  </Text>
                </Button>
              </Flex>
            )}
            {openMenu && (
              <Button onPress={clearMarkers} bgColor='transparent'>
                <TrashIcon />
              </Button>
            )}
            {openMenu && (
              <Button onPress={toggleDarkMode} bgColor='transparent'>
                {darkMode ? (
                  <SunIcon color={darkMode ? '#FFF' : '#000'} size='5' />
                ) : (
                  <MoonIcon color={darkMode ? '#FFF' : '#000'} size='5' />
                )}
              </Button>
            )}
            <Button onPress={toggleMenu} bgColor='transparent'>
              {openMenu ? (
                <CloseIcon color={darkMode ? '#FFF' : '#000'} size='4' />
              ) : (
                <HamburgerIcon color={darkMode ? '#FFF' : '#000'} size='5' />
              )}
            </Button>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

export default Map;