import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";

class Rules extends React.Component {
  render() {
    return(
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Добро пожаловать в beneficio!
          </Text>
        </View>
        <View style={styles.body}>
          <Text style={styles.bodyText}>
            Вы просто обязаны прочитать краткий экскурс по пользованию данным приложением!
          </Text>
          <Text style={styles.bodyText}>
            Ведь мы старались именно для тебя!
          </Text>
          <Text style={styles.bodyText}>
            Ни для кого не секрет, что современное общество - это оплот капитализма. Помимо того, что мы имеем различные способы и пути получения кэша, всё же сталкиваемся с рядом проблем. Для каждого этот список может быть разным, но мы выделим следующие:
          </Text>
          <View style={styles.listWrapper}>
            <Text style={styles.listItemText}>
              1. Недостаток рабочих мест.
            </Text>
            <Text style={styles.listItemText}>
              2. Бюрократическое отношение на работе.
            </Text>
            <Text style={styles.listItemText}>
              3. Незнание специфических, востребованных инструментов для заработка.
            </Text>
            <Text style={styles.listItemText}>
              4. Недостаточный трудоспособный возраст..
            </Text>
          </View>
          <Text style={styles.bodyText}>
            При создании данного приложения мы учли все эти факторы.
          </Text>
          <Text style={styles.bodyText}>
            Вашему вниманию предоставляется первое приложение, в котором можно зарабатывать стабильно каждый день буквально из любого удобного для Вас места!
          </Text>
          <Text style={styles.bodyText}>
            Наша команда ежедневно занимается поиском, подбором, покупкой, и тестированием различных интернет-ресурсов по заработку.
          </Text>
          <Text style={styles.bodyText}>
            Мы обеспечиваем безопасность в пользовании нашим приложением, а также хранение ваших данных. А также, мы гарантируем 100% заработок, так как подбор и создание уровней соответствует правилу «5/5».
          </Text>
          <Text style={styles.bodyText}>
            Итак, разберёмся как это работает.
          </Text>
          <Text style={styles.bodyText}>
            Наши специалисты подбирают наиболее оптимальный ресурс, связываются с его руководством, узнают условия предоставления финансовых услуг. Далее следует тестирование ресурса на безопасность проведения операций со стороны пользователя. В итоге,  оплачиваем финансовые воздержания за информационные услуги или же за пользование самим ресурсом (если он платный).
          </Text>
          <Text style={styles.bodyText}>
            Следующий шаг -  стадия построения и тестирования:
          </Text>
          <View style={styles.listWrapper}>
            <Text style={styles.listItemText}>
              1. Анализ работоспособности ресурса.
            </Text>
            <Text style={styles.listItemText}>
              2. Составление стратегии построения уровня.
            </Text>
            <Text style={styles.listItemText}>
              3. Создание документации по уровню.
            </Text>
            <Text style={styles.listItemText}>
              4. Проектирование уровня, декомпозиция его на более мелкие части для комфортного прохождения.
            </Text>
            <Text style={styles.listItemText}>
              5. Интегрирование нового level’а в приложение.
            </Text>
          </View>
          <Text style={styles.bodyText}>
            После вышеперечисленных стадий, полностью протестированный и готовый уровень появляется в приложении с детальной информацией, а именно: логотип и название уровня, его значимость и стоимость(кэш), комиссионные за успешное прохождение, а также оптимально возможное время его закрытия.
          </Text>
          <Text style={styles.bodyText}>
            Что дальше?
          </Text>
          <Text style={styles.bodyText}>
            Следовательно, Вы как пользователь проходите уровни один за одним, попутно зарабатывая финансовые средства на ВАШЕМ смартфоне.
          </Text>
          <Text style={styles.bodyText}>
            На прохождение одного уровня, заложено 12 часов, но если Вы не успели его пройти - не беда: уровень не исчезает, продолжаете именно с него.
          </Text>
          <Text style={styles.bodyText}>
            Когда прошли уровень, следующий будет доступен через 12 часов.
          </Text>
          <Text style={styles.bodyText}>
            О самом прохождении:
          </Text>
          <Text style={styles.bodyText}>
            В каждом уровне Вам будет представлено пошаговое описание выполнения одного большого задания в сети. Будь то онлайн регистрации на различных ресурсах, будь то сбор и перепродажа крипто-токенов, трафик, работа с биржами, коррекция данных платформы, реферальные операции, и тд.
          </Text>
          <Text style={styles.bodyText}>
            Помимо заработка, наше приложение помогает людям более детально разобраться в мелких нюансах “мировой паутины”, которая легко уместилась в вашем смартфоне.Вы уже сейчас должны понимать, что именно этот ресурс на сегодня предоставляет невероятные условия для развития любых ваших желаний, целей и тд.
          </Text>
          <Text style={styles.bodyText}>
            Как производятся выплаты за прохождение ?
          </Text>
          <Text style={styles.bodyText}>
            После установки приложения, перейдите в раздел «Платежи» и добавьте актуальную карту. За прохождение уровня Вы получите компенсацию. Далее нужно открыть следующий уровень, нажатием кнопки «завершить» на текущем, после нажатия с добавленной карты будут списаны комиссионные, которые указаны на уровневой панеле. С течением времени, следующий этап будет открыт для пользования.
          </Text>
          <Text style={styles.bodyText}>
            С каждым последующим уровнем денежное вознаграждение за прохождение будет расти!
          </Text>
          <Text style={styles.bodyText}>
            В приложении имеется раздел «Приватности», где детально описаны все права хранения данных пользователя.
          </Text>
          <Text style={styles.bodyText}>
            В разделе «Сообщество» расположены ссылки на все актуальные информационные ресурсы нашего приложения:
          </Text>
          <View style={styles.listWrapper}>
            <Text style={styles.listItemText}>
              1. LinkedIn.
            </Text>
            <Text style={styles.listItemText}>
              2. Почта.
            </Text>
            <Text style={styles.listItemText}>
              3. Веб-сайт.
            </Text>
            <Text style={styles.listItemText}>
              4. Facebook.
            </Text>
            <Text style={styles.listItemText}>
              5. Instagram.
            </Text>
            <Text style={styles.listItemText}>
              6. Telegram.
            </Text>
          </View>
          
          <Text style={styles.bodyText}>
            Присоединяйтесь и следите за нашими новостями и обновлениями :)
          </Text>
          <Text style={styles.bodyText}>
            Публичная информация о вашем профиле хранится в разделе «Профайл». Посетите его для более детального изучения.
          </Text>
          <Text style={styles.bodyText}>
            Очень рады видеть Вас на нашей платформе! =).
          </Text>
        </View>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 30
  },
  header: {
    
  },
  headerText: {
    color: "#42a4ff",
    fontSize: 22,
    fontFamily: "RobotoLight",
    textAlign: "left",
    fontWeight: "light",
    paddingBottom: 20
  },
  body: {
    marginTop: 10,
    marginBottom: 10,
  },
  bodyText: {
    textAlign: "left",
    fontSize: 12,
    color: "#a09fa4",
    paddingBottom: 10,
  },
  listItemText: {
    textAlign: "left",
    fontSize: 12,
    color: "#a09fa4",
  },
  listWrapper: {
    flexDirection: "column",
    justifyContent: "space-around",
    paddingLeft: 20,
    paddingBottom: 10
  }
});

export default Rules;