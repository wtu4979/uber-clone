import React, { useRef, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useDispatch, useSelector } from "react-redux";
import tailwind from "tailwind-react-native-classnames";
import { selectDestination, selectOrigin } from "../slices/navSlice";
import MapViewDirections from "react-native-maps-directions";
import { GOOGLE_MAPS_APIKEY } from "@env";
import { Icon } from "react-native-elements";
import Constants from "expo-constants";
import { useNavigation } from "@react-navigation/native";

const Map = () => {
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const mapRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!origin || !destination) return;
    mapRef.current.fitToSuppliedMarkers(["origin", "destination"], {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
    });
  }, [origin, destination]);

  return (
    <View style={tailwind`flex-1 relative`}>
      <TouchableOpacity
        style={[
          tailwind`bg-white p-3 rounded-full shadow-lg`,
          {
            top: Constants.statusBarHeight,
            left: 20,
            position: "absolute",
            zIndex: 100,
          },
        ]}
        onPress={() => navigation.push("Home")}
      >
        <Icon
          type="antdesign"
          name="home"
          color="black"
          size={16}
          // style={}
        />
      </TouchableOpacity>

      <MapView
        ref={mapRef}
        style={tailwind`flex-1 relative z-10`}
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
      >
        {!!origin && !!destination && (
          <MapViewDirections
            // origin={{
            //     latitude: origin?.loaction.lat,
            //     longitude: origin?.loaction.lng,
            // }}
            // destination={{
            //     latitude: destination?.loaction.lat,
            //     longitude: destination?.loaction.lng,
            // }}
            origin={origin.description}
            destination={destination.description}
            lineDashPattern={[0]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="black"
            onError={(error) => console.log("Directions error: ", error)}
          />
        )}
        {origin?.loaction && (
          <Marker
            coordinate={{
              latitude: origin?.loaction.lat,
              longitude: origin?.loaction.lng,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          ></Marker>
        )}
        {destination?.loaction && (
          <Marker
            coordinate={{
              latitude: destination?.loaction.lat,
              longitude: destination?.loaction.lng,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          ></Marker>
        )}
      </MapView>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({});
