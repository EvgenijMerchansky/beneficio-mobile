import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  ActivityIndicator,
  Image,
  Modal,
} from "react-native";

import ActivityIndicatorWrapper from "../../components/ActivityIndicatorWrapper";

import ImageViewer from "react-native-image-zoom-viewer";

import { GET_LEVEL } from '../../constants/apis';

const Step = ({ title, description, imageUrl, index, onModalOpen }) => {
  imageUrl.trim();
  
  return (
    <View style={stepStyles.container}>
      <View style={stepStyles.stepNumber}>
        <Text style={stepStyles.stepNumberText}>
          Шаг {index}: {title}
        </Text>
      </View>
      <View style={stepStyles.stepWrapper}>
        <View style={stepStyles.description}>
          <Text style={[stepStyles.descriptionText, imageUrl ? { paddingBottom: 10 } : { paddingBottom: 0 }]}>
            {description}
          </Text>
          <TouchableWithoutFeedback
            onPress={() => onModalOpen(index)}
            delayPressIn={50}
          >
            <Image
              style={imageUrl ? stepStyles.imageUrlLogo : { display: "none" }}
              source={{uri: imageUrl}}
            />
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  )
};
  
const stepStyles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "transparent",
  },
  stepWrapper: {
    flex: 1,
    backgroundColor: "transparent",
    height: "auto",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "flex-start",
    paddingTop: 10,
    paddingBottom: 20,
  },
  title: {
    marginBottom: 15,
  },
  titleText: {
    color: "#bdbcc1",
    fontSize: 20,
    fontFamily: "RobotoLight",
    textAlign: "left",
    fontWeight: 100,
  },
  description: {
    backgroundColor: "#f5f4f9",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    marginBottom: 15,
    borderColor: "#f0eff4",
    borderWidth: 1
  },
  descriptionText: {
    color: "#bdbcc1"
  },
  imageUrl: {
    marginBottom: 15,
  },
  imageUrlLogo: {
    width: "100%",
    height: 250,
    objectFit: "contain",
    backgroundSize: "cover",
    backgroundColor: "#f9f8fd",
    borderRadius: 5,
    borderColor: "#f0eff4",
    borderWidth: 1
  },
  stepNumber: {
    width: "auto",
  },
  stepNumberText: {
    color: "#bdbcc1",
    fontSize: 16,
    textAlign: "left",
    fontFamily: "RobotoLight",
    fontWeight: "100",
  }
});

class Level extends React.Component {
  
  state = {
    level: {
      logoUrl: "",
      title: "",
      time: "",
      possibleEarnings: "",
      description: "",
      subtitle: "",
      steps: [],
      percentPrice: ""
    },
    currentImage: 0,
    images: [],
    modalIsActive: false,
    loading: false
  };
  
  getSliderImages = () => {
  
    const images = this.state.level.steps
      .map(item => item.imageUrl.trim())
      .filter(item => item !== null && item !== "")
      .map(item => ({ url: item }));
    
    this.setState(state => ({ ...state, images: [ ...images] }));
  };
  
  openModal = (index) => {
    this.setState(state => ({ ...state, currentImage: index - 1, modalIsActive: true }));
  };
  
  closeModal = () => {
    this.setState(state => ({ ...state, currentImage: 0, modalIsActive: false }));
  };
  
  componentDidMount () {
    this.setState(state => ({ ...state, loading: true }));
    
    let { userId, levelId, accessToken, refreshTokenHandler, refreshToken, type } = this.props.navigation.state.params;
  
    fetch(`${GET_LEVEL}?type=${type}&userId=${userId}&levelId=${levelId}`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      }
    }).then(response => {
  
      if (response.status > 205 && response.status < 500) {
        refreshTokenHandler(refreshToken, userId);
  
        fetch(`${GET_LEVEL}?type=${type}userId=${userId}&levelId=${levelId}`, {
          method: "get",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          }
        }).then(response => {
          response.json().then(data => {
            this.setState(state => ({
              ...state,
              level: {
                ...data
              },
              loading: false
            }));
  
            this.getSliderImages();
          });
        });
      } else {
        response.json().then(data => {
          this.setState(state => ({
            ...state,
            level: {
              ...data
            },
            loading: false
          }));
  
          this.getSliderImages();
        });
      }
    });
  }
  
  render() {
    
    if (this.state.loading) {
      return (
        <ActivityIndicatorWrapper/>
      );
    }
  
    let {
      userId,
      accessToken,
      refreshToken,
      refreshTokenHandler,
      levelId,
      type
    } = this.props.navigation.state.params;
    
    return [
      <Modal visible={this.state.modalIsActive} transparent={false}>
        <ImageViewer
          imageUrls={this.state.images}
          enableCenterFocus={true}
          pageAnimateTime={30}
          doubleClickInterval={1}
          index={this.state.currentImage}
          reset
          footerContainerStyle={{ backgroundColor: "transparent", width: "100%", height: 100 }}
          renderFooter={() => (
            <View>
              <TouchableOpacity
                onPress={() => this.closeModal()}
                style={styles.closeModalButton}>
                <Text style={styles.closeModalButtonText}>
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          )}
          loadingRender={() => (
            <ActivityIndicator
              color="f0f0f0"
              size="large"
              style={{
                alignItems: "center",
                justifyContent: "center",
                padding: 8
              }}
            />)}
          enableImageZoom={true}
        />
      </Modal>,
      <View style={styles.globalWrapper}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{flexGrow: 1}}
        >
          <View style={styles.bodyTitle}>
            <Text style={styles.bodyTitleText}>
              {this.state.level.title}
            </Text>
          </View>
          <View style={styles.bodyTime}>
            <Text style={styles.bodyTimeText}>
              Время прохождения: {this.state.level.time}
            </Text>
          </View>
          <View style={styles.bodyPossibleEarnings}>
            <Text style={styles.bodyPossibleEarningsText}>
              Заработок: ${this.state.level.possibleEarnings}
            </Text>
          </View>
          <View style={styles.body}>
            <View style={styles.bodyDescription}>
              <Text style={styles.bodyDescriptionText}>
                {this.state.level.description}
              </Text>
            </View>
            <View style={styles.bodySubtitle}>
              <Text style={styles.bodySubtitleText}>
                Шаги для прохождения:
              </Text>
            </View>
            <View style={styles.bodySteps}>
              {
                this.state.level.steps.map((item, index) => (
                  <Step
                    title={item.title}
                    description={item.description}
                    imageUrl={item.imageUrl}
                    index={index + 1}
                    onModalOpen={this.openModal}
                  />
                ))
              }
            </View>
          </View>
        </ScrollView>
        <View style={styles.completeButtonWrapper}>
          <Text style={styles.finishDescriptionText}>
            {`*Переход в меню оплаты комиссионных*`}
          </Text>
          <View style={styles.buttonsAligner}>
            <TouchableOpacity
              style={styles.completeButton}
              onPress={() => this.props.navigation.push("Payment", {
                userId: userId,
                accessToken: accessToken,
                refreshToken: refreshToken,
                refreshTokenHandler: refreshTokenHandler,
                levelId: levelId,
                type: type
              })}
            >
              <Text style={styles.completeButtonText}>
                Открыть следующий уровень (${this.state.level.percentPrice})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.helpButton}
              onPress={() => this.props.navigation.push("SupportScreen", {
                userId: userId,
                levelId: levelId,
              })}
            >
              <Text style={styles.helpButtonText}>
                Помощь
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    ]
  }
}

const styles = StyleSheet.create({
  globalWrapper: {
    flex: 1,
    height: "100%",
    width: "100%",
    padding: 0,
    margin: 0,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f8fd",
  },
  container: {
    width: "100%",
    padding: 20,
  },
  ImageBlockDimensions: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    backgroundSize: "cover",
    alignSelf: 'stretch',
  },
  header: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    backgroundColor: "#42a4ff",
    width: "100%",
    borderBottomColor: "#cecdd2",
    borderBottomWidth: 1
  },
  headerLogo: {
    width: "100%",
    height: "100%",
  },
  headerLogoImg: {

  },
  body: {

  },
  bodyTitle: {
    marginTop: 10
  },
  bodyTitleText: {
    fontFamily: "RobotoLight",
    textAlign: "left",
    fontWeight: "bold",
    fontSize: 24,
    color: "#99999d",
    marginBottom: 10,
  },
  bodyTime: {
    marginBottom: 5
  },
  bodyTimeText: {
    color: "#8dc5ff",
    fontSize: 13,
  },
  bodyPossibleEarnings: {
    paddingBottom: 20,
  },
  bodyPossibleEarningsText: {
    color: "#8dc5ff",
    fontSize: 13,
  },
  bodyDescription: {
    marginBottom: 10,
  },
  bodyDescriptionText: {
    color: "#bdbcc1",
    fontSize: 16,
  },
  bodySubtitle: {
    marginTop: 10,
    marginBottom: 10,
  },
  bodySubtitleText: {
    color: "#8dc5ff",
    fontSize: 13,
    fontFamily: "RobotoLight",
    textAlign: "left",
    fontWeight: "100",
    marginBottom: 10,
  },
  bodySteps: {
    paddingBottom: 20,
  },
  finishDescription: {
    marginBottom: 10,
  },
  finishDescriptionText: {
    color: "#bdbcc1",
    fontSize: 12,
    paddingBottom: 10,
  },
  completeButtonWrapper: {
    width: "100%",
    paddingTop: 10,
    paddingBottom: 25,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#f9f8fd",
    alignItems: "center",
    borderTopColor: "#edecf1",
    borderTopWidth: 1
  },
  completeButton: {
    width: "75%",
    color: "#fff",
    height: 40,
    borderRadius: 4,
    backgroundColor: "#42a4ff",
    alignItems: "center",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center"
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 12
  },
  helpButton: {
    width: "22%",
    color: "#fff",
    height: 40,
    borderRadius: 4,
    backgroundColor: "#ed4340",
    alignItems: "center",
    padding: 10,
    flexDirection: "column",
    justifyContent: "center"
  },
  helpButtonText: {
    color: "#fff",
    fontSize: 12
  },
  closeModalButton: {
    backgroundColor: "transparent",
    width: "100%",
    height: 100,
    flexDirection: "column",
    justifyContent: "center"
  },
  closeModalButtonText: {
    textAlign: "center",
    fontSize: 16,
    color: "#f9f8fd"
  },
  buttonsAligner: {
    width: "93%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  },
  loadContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
    flexDirection: "column"
  }
});

export default Level;