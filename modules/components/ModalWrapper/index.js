import React from "react";
import {
  Text,
  View,
  TouchableHighlight,
  StyleSheet,
  ScrollView,
  Modal
} from "react-native";

import { RUS } from "../../constants/guide";

class ModalWrapper extends React.Component {
  
  render() {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.props.isOpen}
        onRequestClose={() => {}}>
        <View style={styles.containerGlobalWrapper}>
          <View style={styles.containerWrapper}>
            <ScrollView>
              <View style={styles.header}>
                <Text style={styles.headerText}>
                  Добро пожаловать в beneficio!
                </Text>
              </View>
              <View style={styles.body}>
                <Text style={styles.commonText}>
                  Вы просто обязаны прочитать краткий экскурс по пользованию данным приложением! Ведь мы старались именно для тебя
                </Text>
                <Text style={styles.commonText}>
                  Ни для кого не секрет, что современное общество - это оплот капитализма. Помимо того, что мы имеем различные способы и пути получения кэша, всё же сталкиваемся с рядом проблем. Для каждого этот список может быть разным, но мы выделим следующие:
                </Text>
                <Text style={styles.listItem}>
                  1. Недостаток рабочих мест.
                </Text>
                <Text style={styles.listItem}>
                  2. Бюрократическое отношение на работе.
                </Text>
                <Text style={styles.listItem}>
                  3. Незнание специфических, востребованных инструментов для заработка.
                </Text>
                <Text style={styles.listItem}>
                  4. Недостаточный трудоспособный возраст...
                </Text>
                <Text style={styles.commonText}>
                  При создании данного приложения мы учли все эти факторы.
                </Text>
                <Text style={styles.commonText}>
                  Вашему вниманию предоставляется первое приложение, в котором можно зарабатывать стабильно каждый день буквально из любого удобного для Вас места!
                </Text>
                <Text style={styles.commonText}>
                  Наша команда ежедневно занимается поиском, подбором, покупкой, и тестированием различных интернет-ресурсов по заработку.
                </Text>
                <Text style={styles.commonText}>
                  Мы обеспечиваем безопасность в пользовании нашим приложением, а также хранение ваших данных. А также, мы гарантируем 100% заработок, так как подбор и создание уровней соответствует правилу «5/5».
                </Text>
                <Text style={styles.commonText}>
                  {`Итак, разберёмся как это работает.\nНаши специалисты подбирают наиболее оптимальный ресурс, связываются с его руководством, узнают условия предоставления финансовых услуг.\nДалее следует тестирование ресурса на безопасность проведения операций со стороны пользователя.\nВ итоге, оплачиваем финансовые воздержания за информационные услуги или же за пользование самим ресурсом (если он платный).`}
                </Text>
                <Text style={styles.commonText}>
                  Следующий шаг - стадия построения и тестирования:
                </Text>
                <Text style={styles.listItem}>
                  1.Анализ работоспособности ресурса.
                </Text>
                <Text style={styles.listItem}>
                  2. Составление стратегии построения уровня.
                </Text>
                <Text style={styles.listItem}>
                  3. Создание документации по уровню.
                </Text>
                <Text style={styles.listItem}>
                  4. Проектирование уровня, декомпозиция его на более мелкие части для комфортного прохождения.
                </Text>
                <Text style={styles.listItem}>
                  5. Интегрирование нового level’а в приложение.
                </Text>
                <Text style={styles.commonText}>
                  После вышеперечисленных стадий, полностью протестированный и готовый уровень появляется в приложении с детальной информацией, а именно: логотип и название уровня, его значимость и стоимость(кэш), комиссионные за успешное прохождение, а также оптимально возможное время его закрытия.
                </Text>
                <Text style={styles.commonText}>
                  Что дальше?
                </Text>
                <Text style={styles.commonText}>
                  Следовательно, Вы как пользователь проходите уровни один за одним, попутно зарабатывая финансовые средства на ВАШЕМ смартфоне.
                </Text>
                <Text style={styles.commonText}>
                  На прохождение одного уровня, заложено 12 часов, но если Вы не успели его пройти - не беда: уровень не исчезает, продолжаете именно с него.
                </Text>
                <Text style={styles.commonText}>
                  Когда прошли уровень, следующий будет доступен через 12 часов.
                </Text>
                <Text style={styles.commonText}>
                  О самом прохождении:
                </Text>
                <Text style={styles.commonText}>
                  В каждом уровне Вам будет представлено пошаговое описание выполнения одного большого задания в сети. Будь то онлайн регистрации на различных ресурсах, будь то сбор и перепродажа крипто-токенов, трафик, работа с биржами, коррекция данных платформы, реферальные операции, и тд.
                </Text>
                <Text style={styles.commonText}>
                  Помимо заработка, наше приложение помогает людям более детально разобраться в мелких нюансах “мировой паутины”, которая легко уместилась в вашем смартфоне.Вы уже сейчас должны понимать, что именно этот ресурс на сегодня предоставляет невероятные условия для развития любых ваших желаний, целей и тд.
                </Text>
                <Text style={styles.commonText}>
                  Как производятся выплаты за прохождение ?
                </Text>
                <Text style={styles.commonText}>
                  После установки приложения, за прохождение уровня Вы получите компенсацию. Далее нужно открыть следующий уровень, нажатием кнопки «завершить» на текущем, после нажатия вы перенаправитесь в меню оплаты комиссионных за предоставленный вам уровень (оплата коммисионных доступна с любой банковской карты или счета), коммисионные указаны на уровневой панеле а так же в самой кнопке перехода в меню оплаты. С течением времени, следующий уровень будет открыт для прохождения.
                </Text>
                <Text style={styles.commonText}>
                  С каждым последующим уровнем денежное вознаграждение за прохождение будет расти!
                </Text>
                <Text style={styles.commonText}>
                  В приложении имеется раздел «Приватности», где детально описаны все права хранения данных пользователя.
                </Text>
                <Text style={styles.commonText}>
                  В разделе «Сообщество» расположены ссылки на все актуальные информационные ресурсы нашего приложения:
                </Text>
                <Text style={styles.listItem}>
                  1. LinkedIn.
                </Text>
                <Text style={styles.listItem}>
                  2. Почта.
                </Text>
                <Text style={styles.listItem}>
                  3. Веб-сайт.
                </Text>
                <Text style={styles.listItem}>
                  4. Facebook.
                </Text>
                <Text style={styles.listItem}>
                  5. Instagram.
                </Text>
                <Text style={styles.listItem}>
                  6. Telegram.
                </Text>
                <Text style={styles.commonText}>
                  Присоединяйтесь и следите за нашими новостями и обновлениями
                </Text>
                <Text style={styles.commonText}>
                  Публичная информация о вашем профиле хранится в разделе «Профайл». Посетите его для более детального изучения.
                </Text>
                <Text style={styles.commonText}>
                  Очень рады видеть Вас на нашей платформе! =).
                </Text>
              </View>
            </ScrollView>
            <TouchableHighlight
              style={styles.buttonStyles}
              onPress={() => this.props.onModalClose()}>
              <Text style={{ color: "#fff" }}>Понял, принял!</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  containerGlobalWrapper: {
    backgroundColor: "#8b8a8e",
    zIndex: 0,
    padding: 20,
    flex: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  containerWrapper: {
    backgroundColor: "#f9f8fd",
    zIndex: 9999,
    padding: 20,
    flex: .6,
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  container: {
    backgroundColor: "#f9f8fd",
  },
  header: {
    padding: 20,
    backgroundColor: "f9f8fd",
    position: "fixed"
  },
  headerText: {
    color: "#42a4ff",
    fontSize: 16,
    fontFamily: "RobotoLight",
    textAlign: "center",
    fontWeight: "light",
  },
  buttonStyles: {
    width: "100%",
    height: 40,
    backgroundColor: "#42a4ff",
    borderRadius: 4,
    alignItems: "center",
    paddingTop: 12,
    marginTop: 20
  },
  body: {
    flex: 0.9
  },
  commonText: {
    color: "#a09fa4",
    fontSize: 14,
    paddingBottom: 15,
  },
  listItem: {
    color: "#a09fa4",
    fontSize: 14,
    paddingBottom: 7,
    paddingLeft: 40
  }
});

export default ModalWrapper;