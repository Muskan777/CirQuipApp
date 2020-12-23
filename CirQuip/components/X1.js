import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  ScrollView,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { Image as ReactImage } from "react-native";
import Svg, { Defs, Pattern } from "react-native-svg";
import { Path as SvgPath } from "react-native-svg";
import { Text as SvgText } from "react-native-svg";
import { Image as SvgImage } from "react-native-svg";

export default class X1 extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handlePress(target, owner) {
    if (this.props.onPress) {
      let name;
      let id;
      let index = -1;
      if (target.search("::") > -1) {
        const varCount = target.split("::").length;
        if (varCount === 2) {
          name = target.split("::")[0];
          id = target.split("::")[1];
        } else if (varCount === 3) {
          name = target.split("::")[0];
          index = parseInt(target.split("::")[1]);
          id = target.split("::")[2];
        }
      } else {
        name = target;
      }
      this.props.onPress({
        type: "button",
        name: name,
        index: index,
        id: id,
        owner: owner,
      });
    }
  }

  handleChangeTextinput(name, value) {
    let id;
    let index = -1;
    if (name.search("::") > -1) {
      const varCount = name.split("::").length;
      if (varCount === 2) {
        name = name.split("::")[0];
        id = name.split("::")[1];
      } else if (varCount === 3) {
        name = name.split("::")[0];
        index = name.split("::")[1];
        id = name.split("::")[2];
      }
    } else {
      name = name;
    }
    let state = this.state;
    state[name.split("::").join("")] = value;
    this.setState(state, () => {
      if (this.props.onChange) {
        this.props.onChange({
          type: "textinput",
          name: name,
          value: value,
          index: index,
          id: id,
        });
      }
    });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView
          data-layer="a5b6fe50-d7f5-43ce-b20d-0f6240c86f90"
          style={styles.x1}
        >
          <View
            data-layer="d07faa7c-fd83-4ee7-b31d-ce4acbdfbc31"
            style={styles.x1_loader}
          >
            <Svg
              data-layer="d8ffa84c-2a8f-43e4-b5b2-e4359dca1e18"
              style={styles.x1_loader_x2}
              preserveAspectRatio="none"
              viewBox="-7.5 -7.5 65 65"
              fill="transparent"
            >
              <SvgPath d="M 25 0 C 38.8071174621582 0 50 11.1928825378418 50 25 C 50 38.8071174621582 38.8071174621582 50 25 50 C 11.1928825378418 50 0 38.8071174621582 0 25 C 0 11.1928825378418 11.1928825378418 0 25 0 Z" />
            </Svg>
            <Svg
              data-layer="8543b97e-9d9f-4d64-aceb-93533a730175"
              style={styles.x1_loader_x1f994d31b}
              preserveAspectRatio="none"
              viewBox="-3.75 -3.75 57.5 57.5"
              fill="transparent"
            >
              <SvgPath d="M 25 0 C 38.8071174621582 0 50 11.1928825378418 50 25 C 50 38.8071174621582 38.8071174621582 50 25 50 C 11.1928825378418 50 0 38.8071174621582 0 25 C 0 11.1928825378418 11.1928825378418 0 25 0 Z" />
            </Svg>
          </View>
          <View
            data-layer="f914725f-3592-4e4e-8e21-f1c21e4fed07"
            style={styles.x1_group55}
          >
            <View
              data-layer="d6fce5ad-6ad4-48ba-abea-a015242ef566"
              style={styles.x1_group55_group2}
            >
              <View
                data-layer="b90e61d6-7e1c-40e8-b58c-65394fd33a83"
                style={styles.x1_group55_group2_rectangle9263555c7}
              ></View>
              <Svg
                data-layer="7321391f-b6aa-443e-bdfa-90a2eef531ed"
                style={styles.x1_group55_group2_line27e8925c7}
                preserveAspectRatio="none"
                viewBox="0 -0.5 357 1"
                fill="transparent"
              >
                <SvgPath d="M 0 0 L 357 0" />
              </Svg>
              <ReactImage
                data-layer="3cbad73d-3868-4fd6-805a-88137ef488cf"
                source={require("../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194686030dcc2.png")}
                style={
                  styles.x1_group55_group2_badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194686030dcc2
                }
              />
              <View
                data-layer="357d8016-140f-4d17-bd52-fc4e4014e8b2"
                style={styles.x1_group55_group2_group279d138669}
              >
                <Text
                  data-layer="9b325e85-99a6-4ec8-a0dc-986d732cacdc"
                  style={
                    styles.x1_group55_group2_group279d138669_electricBikeDevelopingClubCoep
                  }
                >
                  Electric bike developing club | COEP
                </Text>
                <Text
                  data-layer="c493de61-d028-44fb-a024-4745ec8e0d53"
                  style={styles.x1_group55_group2_group279d138669_deltaClub}
                >
                  Delta Club
                </Text>
                <Svg
                  data-layer="a9fe73df-cfdf-44e0-8813-4b9f36396283"
                  style={
                    styles.x1_group55_group2_group279d138669_ellipse12fcc1c7c
                  }
                  preserveAspectRatio="none"
                  viewBox="0 0 45 44"
                  fill="rgba(255, 255, 255, 0)"
                >
                  <Defs>
                    <Pattern
                      id="img-ellipse12fcc1c7c"
                      patternContentUnits="userSpaceOnUse"
                      width="100%"
                      height="100%"
                    >
                      <SvgImage
                        xlinkHref={require("../assets/ellipse12fcc1c7c.png")}
                        x="0"
                        y="0"
                        width="45.00px"
                        height="44.00px"
                      />
                    </Pattern>
                  </Defs>
                  <SvgPath
                    d="M 22.5 0 C 34.92640686035156 0 45 9.849736213684082 45 22 C 45 34.15026473999023 34.92640686035156 44 22.5 44 C 10.07359409332275 44 0 34.15026473999023 0 22 C 0 9.849736213684082 10.07359409332275 0 22.5 0 Z"
                    fill="url(#img-ellipse12fcc1c7c)"
                  />
                </Svg>
              </View>
              <Text
                data-layer="e5612275-2eae-43b7-9a83-85e67ca79063"
                style={
                  styles.x1_group55_group2_weAreProudToAnnounceThatOurClubHasInventedTheFirstEverCvJointWhichSeeMore
                }
              >
                We are proud to announce that our club has invented the first
                ever CV joint which ...see more
              </Text>
              <View
                data-layer="4fc9edb0-a5cf-4e28-b678-6000a74afb7a"
                style={styles.x1_group55_group2_group1250}
              >
                <View
                  data-layer="f24384ae-40e7-438e-ad90-c3c388f2ebed"
                  style={
                    styles.x1_group55_group2_group1250_rectangle3522f609cad
                  }
                ></View>
                <Text
                  data-layer="09869c88-8ad9-49ec-9512-b157021d1c44"
                  style={styles.x1_group55_group2_group1250_x5Comments}
                >
                  5 comments
                </Text>
              </View>
            </View>
            <View
              data-layer="9c3d6483-ef71-4dd8-a9cb-0b6c2608d0a9"
              style={styles.x1_group55_group3}
            >
              <View
                data-layer="33432fad-5967-48b6-bde5-c8c32ec1f441"
                style={styles.x1_group55_group3_rectangle9961f913c}
              ></View>
              <Svg
                data-layer="9c38f054-ec2e-4fe4-a412-23fbc05bde12"
                style={styles.x1_group55_group3_line2c7a57756}
                preserveAspectRatio="none"
                viewBox="0 -0.5 357 1"
                fill="transparent"
              >
                <SvgPath d="M 0 0 L 357 0" />
              </Svg>
              <ReactImage
                data-layer="fa59cacf-0e2f-4492-91f0-2536b1cfadaa"
                source={require("../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k202019468cf847c17.png")}
                style={
                  styles.x1_group55_group3_badBoysForLife5120x5120WillSmithMartinLawrence4k5k202019468cf847c17
                }
              />
              <View
                data-layer="57be193e-eba6-4e70-8f58-bcc3d121b816"
                style={styles.x1_group55_group3_group27dacd30fa}
              >
                <Text
                  data-layer="f1a04db0-b9be-4a89-96e7-7effb7996cb1"
                  style={
                    styles.x1_group55_group3_group27dacd30fa_instrumentationSecondYearECell
                  }
                >
                  Instrumentation | Second Year | E-Cell
                </Text>
                <Text
                  data-layer="d50b747b-b7eb-4766-ae18-9b61c9072d19"
                  style={styles.x1_group55_group3_group27dacd30fa_akashMehta}
                >
                  Akash Mehta
                </Text>
                <Svg
                  data-layer="fbc23966-c9e9-4201-bce1-9676ebd22086"
                  style={
                    styles.x1_group55_group3_group27dacd30fa_ellipse1fb725fe1
                  }
                  preserveAspectRatio="none"
                  viewBox="0 0 45 44"
                  fill="rgba(255, 255, 255, 0)"
                >
                  <Defs>
                    <Pattern
                      id="img-ellipse1fb725fe1"
                      patternContentUnits="userSpaceOnUse"
                      width="100%"
                      height="100%"
                    >
                      <SvgImage
                        xlinkHref={require("../assets/ellipse1fb725fe1.png")}
                        x="0"
                        y="0"
                        width="45.00px"
                        height="44.00px"
                      />
                    </Pattern>
                  </Defs>
                  <SvgPath
                    d="M 22.5 0 C 34.92640686035156 0 45 9.849736213684082 45 22 C 45 34.15026473999023 34.92640686035156 44 22.5 44 C 10.07359409332275 44 0 34.15026473999023 0 22 C 0 9.849736213684082 10.07359409332275 0 22.5 0 Z"
                    fill="url(#img-ellipse1fb725fe1)"
                  />
                </Svg>
                <Text
                  data-layer="bf35ea92-9d46-4f53-95e5-cd73c8515a02"
                  style={
                    styles.x1_group55_group3_group27dacd30fa_studentac2cde94
                  }
                >
                  Student
                </Text>
                <View
                  data-layer="81358cf9-ebb4-4bf4-b85a-d33cd1306742"
                  style={
                    styles.x1_group55_group3_group27dacd30fa_radioButton125ce17d
                  }
                >
                  <Svg
                    data-layer="3059b507-0e2f-4195-a84e-a94d8f89f66b"
                    style={
                      styles.x1_group55_group3_group27dacd30fa_radioButton125ce17d_dot2b9b35353
                    }
                    preserveAspectRatio="none"
                    viewBox="0 0 4 4"
                    fill="rgba(0, 0, 0, 0.6196078431372549)"
                  >
                    <SvgPath d="M 2 0 C 3.104569435119629 0 4 0.8954305648803711 4 2 C 4 3.104569435119629 3.104569435119629 4 2 4 C 0.8954305648803711 4 0 3.104569435119629 0 2 C 0 0.8954305648803711 0.8954305648803711 0 2 0 Z" />
                  </Svg>
                </View>
              </View>
              <Text
                data-layer="f5ba70dc-664b-41cc-a69d-befca1a6cbde"
                style={
                  styles.x1_group55_group3_helloGuyImSharingOneOfMyRecentProjectInCtisCentralTyreInflationSystemimDesignedTheRotaryUnionAndNeedSomeoneWithKnowledgeOfElectronicsAndControllerINeedToProgramTheThePressureSignalInSuchAWayThatThePumpsee
                }
              >
                Hello guy, I'm sharing one of my recent project in CTIS (Central
                Tyre Inflation System) I'm designed the rotary Union and need
                someone with knowledge of electronics and controller. I need to
                program the the pressure signal in such a way that the
                pump...see more
              </Text>
              <View
                data-layer="add61a61-691c-42c5-85f0-a88e52f4439d"
                style={styles.x1_group55_group3_group12517183999c}
              >
                <View
                  data-layer="88fb1d70-773a-4e86-b5f6-03c1015153dd"
                  style={
                    styles.x1_group55_group3_group12517183999c_rectangle352185bc780
                  }
                ></View>
                <Text
                  data-layer="bcb8a5f9-0d69-4f29-91d8-7a38e5e1a54a"
                  style={
                    styles.x1_group55_group3_group12517183999c_x38Comments5012e77a
                  }
                >
                  38 comments
                </Text>
              </View>
              <View
                data-layer="14dde6e6-5de3-4389-b8c0-041c68920007"
                style={styles.x1_group55_group3_group127766972e3d}
              >
                <View
                  data-layer="9fe7341f-3734-4804-9625-38eb85df0d75"
                  style={
                    styles.x1_group55_group3_group127766972e3d_rectangle1057811528
                  }
                ></View>
                <View
                  data-layer="ffa1ab7c-6188-4ad1-a195-105b20001daf"
                  style={
                    styles.x1_group55_group3_group127766972e3d_rectangle1189232837
                  }
                ></View>
                <View
                  data-layer="3835ae97-8360-474e-8ebd-eb2238f161b6"
                  style={
                    styles.x1_group55_group3_group127766972e3d_rectangle12e36d8af8
                  }
                ></View>
                <View
                  data-layer="b17072f0-4fb8-418f-ba63-3bb97dd2be10"
                  style={
                    styles.x1_group55_group3_group127766972e3d_rectangle13d057e1de
                  }
                ></View>
                <Text
                  data-layer="36d98afa-bde8-41ea-879e-87933244b22d"
                  style={
                    styles.x1_group55_group3_group127766972e3d_like77efffc9
                  }
                >
                  Like
                </Text>
                <Text
                  data-layer="34a3226d-3b4b-41b6-90b3-9319393c5898"
                  style={
                    styles.x1_group55_group3_group127766972e3d_commentc1176ac7
                  }
                >
                  Comment
                </Text>
                <View
                  data-layer="6763e33f-cac8-4759-b369-ff7a9895cd7f"
                  style={
                    styles.x1_group55_group3_group127766972e3d_likeb9c27a98
                  }
                >
                  <View
                    data-layer="c4633061-92f8-42f5-8a5b-26115cd8d564"
                    style={
                      styles.x1_group55_group3_group127766972e3d_likeb9c27a98_group1260456a87a4
                    }
                  >
                    <View
                      data-layer="e729c1c7-3c71-4599-825b-bda1be1b957f"
                      style={
                        styles.x1_group55_group3_group127766972e3d_likeb9c27a98_group1260456a87a4_group12596d0a3873
                      }
                    >
                      <Svg
                        data-layer="a4c437c0-322d-41f7-a801-6c19b344daba"
                        style={
                          styles.x1_group55_group3_group127766972e3d_likeb9c27a98_group1260456a87a4_group12596d0a3873_path23604a2bbaa
                        }
                        preserveAspectRatio="none"
                        viewBox="-1.1920928955078125e-7 224 4.5538330078125 8.45703125"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path23604a2bbaa"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path23604a2bbaa.png")}
                              x="0"
                              y="0"
                              width="4.55px"
                              height="8.46px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 1.626360058784485 224 C 0.7299149632453918 224 0 224.7299194335938 0 225.6263732910156 L 0 230.8307647705078 C 0 231.7272033691406 0.7299149632453918 232.4571228027344 1.626360058784485 232.4571228027344 L 3.578004360198975 232.4571228027344 C 3.944272756576538 232.4571228027344 4.28123664855957 232.3335266113281 4.553826808929443 232.1279296875 L 4.553826808929443 224 L 1.626360058784485 224 Z"
                          fill="url(#img-path23604a2bbaa)"
                        />
                      </Svg>
                    </View>
                  </View>
                  <View
                    data-layer="3147a4c6-8a9f-48da-9408-f8fbbf3061bb"
                    style={
                      styles.x1_group55_group3_group127766972e3d_likeb9c27a98_group1262cbba1c44
                    }
                  >
                    <View
                      data-layer="e3f7dd3f-cbbd-4dd4-a97f-22fff8162e3e"
                      style={
                        styles.x1_group55_group3_group127766972e3d_likeb9c27a98_group1262cbba1c44_group1261e9b9e616
                      }
                    >
                      <Svg
                        data-layer="1c28ad7a-bebd-4695-91a0-cfa9ece96eab"
                        style={
                          styles.x1_group55_group3_group127766972e3d_likeb9c27a98_group1262cbba1c44_group1261e9b9e616_path237232afbbe
                        }
                        preserveAspectRatio="none"
                        viewBox="170.6669921875 10.666976928710938 10.40875244140625 14.31201171875"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path237232afbbe"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path237232afbbe.png")}
                              x="0"
                              y="0"
                              width="10.41px"
                              height="14.31px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 181.0757446289063 19.61200332641602 C 181.0757446289063 19.22103500366211 180.9209289550781 18.85671615600586 180.6522369384766 18.58803176879883 C 180.9560546875 18.25561141967773 181.1108703613281 17.80996513366699 181.0685729980469 17.34614372253418 C 180.9924621582031 16.519287109375 180.2475738525391 15.87134170532227 179.3719635009766 15.87134170532227 L 175.353515625 15.87134170532227 C 175.5525970458984 15.26697158813477 175.8713531494141 14.15910911560059 175.8713531494141 13.2691593170166 C 175.8713531494141 11.85811996459961 174.6723937988281 10.66697692871094 173.9197082519531 10.66697692871094 C 173.2437896728516 10.66697692871094 172.7610626220703 11.04754829406738 172.7402648925781 11.06316089630127 C 172.6635131835938 11.12497329711914 172.6186218261719 11.21865272521973 172.6186218261719 11.31751537322998 L 172.6186218261719 13.52351379394531 L 170.7450561523438 17.5822925567627 L 170.6669921875 17.62196731567383 L 170.6669921875 24.59455108642578 C 171.1965179443359 24.84436225891113 171.8665771484375 24.97902679443359 172.2933502197266 24.97902679443359 L 178.2647399902344 24.97902679443359 C 178.9731750488281 24.97902679443359 179.5931701660156 24.50151252746582 179.7388610839844 23.84252738952637 C 179.8136749267578 23.50358200073242 179.7700958251953 23.16204452514648 179.6211242675781 22.86539459228516 C 180.1018676757813 22.62339019775391 180.4252014160156 22.1283130645752 180.4252014160156 21.56364822387695 C 180.4252014160156 21.33335494995117 180.3725128173828 21.11281967163086 180.2723388671875 20.91310882568359 C 180.7530822753906 20.67110443115234 181.0757446289063 20.17602920532227 181.0757446289063 19.61200332641602 Z"
                          fill="url(#img-path237232afbbe)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
                <View
                  data-layer="9e2bbf5c-10a1-410c-967f-70215d9447e9"
                  style={
                    styles.x1_group55_group3_group127766972e3d_chatBubblesWithEllipsis1373c8dec
                  }
                >
                  <Svg
                    data-layer="a7d6bfd6-2406-44ce-a8b5-ecfeaf7cf806"
                    style={
                      styles.x1_group55_group3_group127766972e3d_chatBubblesWithEllipsis1373c8dec_path227cddbe926
                    }
                    preserveAspectRatio="none"
                    viewBox="0 3.239999532699585 17.67047119140625 14.179931640625"
                    fill="transparent"
                  >
                    <Defs>
                      <Pattern
                        id="img-path227cddbe926"
                        patternContentUnits="userSpaceOnUse"
                        width="100%"
                        height="100%"
                      >
                        <SvgImage
                          xlinkHref={require("../assets/path227cddbe926.png")}
                          x="0"
                          y="0"
                          width="17.67px"
                          height="14.18px"
                        />
                      </Pattern>
                    </Defs>
                    <SvgPath
                      d="M 15.46981716156006 3.239999532699585 L 2.461630821228027 3.239999532699585 C 1.317129135131836 3.239999532699585 0 4.256734371185303 0 5.236770153045654 L 0 13.12055110931396 C 0 14.02310657501221 1.115957260131836 14.67487812042236 2.186380386352539 14.77546501159668 L 1.489755630493164 17.41993141174316 L 5.953588485717773 14.79381370544434 L 15.46981906890869 14.79381370544434 C 16.61432075500488 14.79381370544434 17.67047119140625 14.0999059677124 17.67047119140625 13.12055110931396 L 17.67047119140625 6.742164611816406 L 17.67047119140625 5.236770153045654 C 17.67047119140625 4.256734371185303 16.61363983154297 3.239999532699585 15.46981716156006 3.239999532699585 Z M 4.446160316467285 9.894996643066406 C 3.797110557556152 9.894996643066406 3.271075248718262 9.368959426879883 3.271075248718262 8.719905853271484 C 3.271075248718262 8.070853233337402 3.797110557556152 7.544815540313721 4.446160316467285 7.544815540313721 C 5.09453296661377 7.544815540313721 5.621248245239258 8.070853233337402 5.621248245239258 8.719905853271484 C 5.621248245239258 9.368959426879883 5.09453296661377 9.894996643066406 4.446160316467285 9.894996643066406 Z M 8.835235595703125 9.894996643066406 C 8.186184883117676 9.894996643066406 7.660148620605469 9.368959426879883 7.660148620605469 8.719905853271484 C 7.660148620605469 8.070853233337402 8.186184883117676 7.544815540313721 8.835235595703125 7.544815540313721 C 9.484284400939941 7.544815540313721 10.01032161712646 8.070853233337402 10.01032161712646 8.719905853271484 C 10.01032161712646 9.368959426879883 9.484284400939941 9.894996643066406 8.835235595703125 9.894996643066406 Z M 13.22498798370361 9.894996643066406 C 12.57593822479248 9.894996643066406 12.04922294616699 9.368959426879883 12.04922294616699 8.719905853271484 C 12.04922294616699 8.070853233337402 12.57593822479248 7.544815540313721 13.22498798370361 7.544815540313721 C 13.87267875671387 7.544815540313721 14.40007400512695 8.070853233337402 14.40007400512695 8.719905853271484 C 14.40007400512695 9.368959426879883 13.87267971038818 9.894996643066406 13.22498798370361 9.894996643066406 Z"
                      fill="url(#img-path227cddbe926)"
                    />
                  </Svg>
                </View>
                <Text
                  data-layer="da92aef2-1733-443a-bb2c-85077a21db64"
                  style={
                    styles.x1_group55_group3_group127766972e3d_bookmarkdf6bf805
                  }
                >
                  Bookmark
                </Text>
                <View
                  data-layer="f7a26736-03f7-438a-8428-b5c4c102662c"
                  style={
                    styles.x1_group55_group3_group127766972e3d_bookmarkb35b76c9
                  }
                >
                  <View
                    data-layer="652e7669-5eab-4ff4-9204-5a6158aacd1a"
                    style={
                      styles.x1_group55_group3_group127766972e3d_bookmarkb35b76c9_group12278525d3da
                    }
                  >
                    <Svg
                      data-layer="97a822d0-e252-4ad4-a98d-74946ec4c030"
                      style={
                        styles.x1_group55_group3_group127766972e3d_bookmarkb35b76c9_group12278525d3da_path216b45b61c2
                      }
                      preserveAspectRatio="none"
                      viewBox="105.91800689697266 -0.75 11.12701416015625 16.525634765625"
                      fill="transparent"
                    >
                      <SvgPath d="M 114.919792175293 0 L 108.0433120727539 0 C 107.2851486206055 0 106.6680068969727 0.5615495443344116 106.6680068969727 1.252136588096619 L 106.6680068969727 14.71250915527344 C 106.6680068969727 14.83174419403076 106.7425689697266 14.9405632019043 106.8600540161133 14.99344539642334 C 106.9789276123047 15.04603576660156 107.117919921875 15.03350257873535 107.2213287353516 14.96072387695313 L 111.4815444946289 11.97712993621826 L 115.7417526245117 14.96072387695313 C 115.8028717041016 15.00351238250732 115.8767395019531 15.02552127838135 115.9512710571289 15.02552127838135 C 116.0029830932617 15.02552127838135 116.0546798706055 15.01480960845947 116.10302734375 14.99341583251953 C 116.2205581665039 14.94053363800049 116.2950744628906 14.83171653747559 116.2950744628906 14.71248054504395 L 116.2950744628906 1.252136588096619 C 116.2951049804688 0.5615495443344116 115.6779632568359 0 114.919792175293 0 Z" />
                    </Svg>
                  </View>
                </View>
                <Text
                  data-layer="0798ee26-89eb-45b1-a343-1940b1664a22"
                  style={
                    styles.x1_group55_group3_group127766972e3d_shareb944f669
                  }
                >
                  Share
                </Text>
                <View
                  data-layer="de3f4fd3-dce4-4caf-a878-db91d9145cbf"
                  style={
                    styles.x1_group55_group3_group127766972e3d_share4f33d28b
                  }
                >
                  <View
                    data-layer="04135365-841e-42f5-868f-a5787a1b8bd9"
                    style={
                      styles.x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5
                    }
                  >
                    <View
                      data-layer="a1901433-db46-48f0-873f-1778b3370c41"
                      style={
                        styles.x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5_group126361e81bb2
                      }
                    >
                      <Svg
                        data-layer="059179dc-edee-40cb-9a3f-69960aad341c"
                        style={
                          styles.x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5_group126361e81bb2_path238a261a3bd
                        }
                        preserveAspectRatio="none"
                        viewBox="106.66697692871094 64.0044937133789 15.57122802734375 12.29248046875"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path238a261a3bd"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path238a261a3bd.png")}
                              x="0"
                              y="0"
                              width="15.57px"
                              height="12.29px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 122.0951385498047 69.020263671875 L 116.3583068847656 64.10297393798828 C 116.2374572753906 63.99893951416016 116.0670013427734 63.97531127929688 115.9205169677734 64.04174041748047 C 115.7752685546875 64.10858154296875 115.6820220947266 64.25382995605469 115.6820220947266 64.41391754150391 L 115.6820220947266 67.28795623779297 C 111.1032562255859 67.41522979736328 108.8943176269531 69.68174743652344 107.8442840576172 71.59177398681641 C 106.9311065673828 73.25209045410156 106.7262268066406 74.89596557617188 106.6801910400391 75.57066345214844 C 106.6714019775391 75.67392730712891 106.6669769287109 75.77915191650391 106.6669769287109 75.88640594482422 L 106.6669769287109 75.88760375976563 C 106.6669769287109 75.88760375976563 106.6669769287109 75.88798522949219 106.6669769287109 75.88841247558594 L 106.6669769287109 75.8887939453125 C 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 L 106.6669769287109 75.89037322998047 L 106.6669769287109 75.89075469970703 C 106.6669769287109 75.89075469970703 106.6669769287109 75.89113616943359 106.6669769287109 75.89156341552734 L 106.6669769287109 75.89194488525391 C 106.6669769287109 75.89232635498047 106.6669769287109 75.89275360107422 106.6669769287109 75.89275360107422 C 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 L 106.6669769287109 75.89432525634766 C 106.6669769287109 75.89471435546875 106.6669769287109 75.89513397216797 106.6669769287109 75.89551544189453 C 106.6669769287109 75.89551544189453 106.6669769287109 75.89590454101563 106.6669769287109 75.89670562744141 L 106.6669769287109 75.8970947265625 L 106.6669769287109 75.89789581298828 L 106.6669769287109 75.89828491210938 C 106.6669769287109 75.89866638183594 106.6669769287109 75.89909362792969 106.6669769287109 75.89947509765625 L 106.6673736572266 75.90066528320313 C 106.6673736572266 75.90066528320313 106.6673736572266 75.90066528320313 106.6673736572266 75.90104675292969 C 106.6673736572266 75.90185546875 106.6673736572266 75.90224456787109 106.6673736572266 75.90224456787109 C 106.6673736572266 75.90262603759766 106.6673736572266 75.90304565429688 106.6673736572266 75.90343475341797 L 106.6673736572266 75.90462493896484 L 106.6673736572266 75.90581512451172 L 106.6673736572266 75.90619659423828 L 106.6673736572266 75.90738677978516 C 106.6673736572266 75.90777587890625 106.6673736572266 75.908203125 106.6673736572266 75.90857696533203 C 106.6673736572266 75.90857696533203 106.6673736572266 75.90939331054688 106.6677551269531 75.90976715087891 C 106.6677551269531 75.90976715087891 106.6677551269531 75.91016387939453 106.6677551269531 75.91096496582031 L 106.6677551269531 75.91135406494141 C 106.6677551269531 75.91172790527344 106.6677551269531 75.91215515136719 106.6677551269531 75.91254425048828 L 106.6677551269531 75.91373443603516 C 106.6677551269531 75.91411590576172 106.6677551269531 75.91453552246094 106.6677551269531 75.91492462158203 C 106.6673736572266 75.91611480712891 106.6685638427734 75.91653442382813 106.6681365966797 75.91653442382813 L 106.6681365966797 75.917724609375 C 106.6681365966797 75.91811370849609 106.6681365966797 75.91853332519531 106.6681365966797 75.91891479492188 L 106.6681365966797 75.92011260986328 C 106.6681365966797 75.92091369628906 106.6685180664063 75.92172241210938 106.6685180664063 75.92172241210938 L 106.6685180664063 75.92291259765625 C 106.6685180664063 75.92330169677734 106.6685180664063 75.92372131347656 106.6685180664063 75.92410278320313 L 106.6685180664063 75.92449188232422 L 106.6685180664063 75.92529296875 L 106.6685180664063 75.92568206787109 L 106.6688995361328 75.92648315429688 L 106.6688995361328 75.92687225341797 C 106.6688995361328 75.92725372314453 106.6688995361328 75.92767333984375 106.6688995361328 75.92767333984375 C 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 L 106.6688995361328 75.92926025390625 L 106.6688995361328 75.92963409423828 C 106.6692962646484 75.93002319335938 106.6692962646484 75.93002319335938 106.6692962646484 75.93045043945313 C 106.6692962646484 75.93045043945313 106.6692962646484 75.93082427978516 106.6692962646484 75.93125152587891 L 106.6692962646484 75.931640625 C 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 L 106.6692962646484 75.93283081054688 C 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 C 106.669677734375 75.93440246582031 106.669677734375 75.93482971191406 106.669677734375 75.93521118164063 L 106.669677734375 75.93559265136719 L 106.669677734375 75.9364013671875 L 106.669677734375 75.93678283691406 C 106.6700592041016 75.93717193603516 106.6700592041016 75.93759155273438 106.6700592041016 75.93759155273438 C 106.6700592041016 75.93840026855469 106.6700592041016 75.93878173828125 106.6700592041016 75.93878173828125 C 106.6956787109375 76.14085388183594 106.8681335449219 76.29694366455078 107.0766143798828 76.29694366455078 C 107.3027038574219 76.29694366455078 107.4859771728516 76.11408233642578 107.4864044189453 75.88796234130859 L 107.4864044189453 75.8875732421875 C 107.4864044189453 75.86675262451172 107.4867858886719 75.81592559814453 107.4904022216797 75.73832702636719 C 107.6692657470703 72.33087921142578 113.96435546875 71.55774688720703 115.681884765625 71.41007232666016 L 115.681884765625 74.24807739257813 C 115.681884765625 74.40816497802734 115.7751159667969 74.55341339111328 115.9203643798828 74.62026214599609 C 116.0664215087891 74.68667602539063 116.2364959716797 74.66347503662109 116.358154296875 74.55902099609375 L 122.0949859619141 69.64173126220703 C 122.1858367919922 69.56409454345703 122.2382354736328 69.45045471191406 122.2382354736328 69.33078765869141 C 122.2383880615234 69.21154022216797 122.1859588623047 69.097900390625 122.0951385498047 69.020263671875 Z"
                          fill="url(#img-path238a261a3bd)"
                        />
                      </Svg>
                      <Svg
                        data-layer="b1f08703-1805-4424-baaf-86915518cf00"
                        style={
                          styles.x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5_group126361e81bb2_path239bd11e57b
                        }
                        preserveAspectRatio="none"
                        viewBox="0 149.32899475097656 17.2105712890625 13.82568359375"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path239bd11e57b"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path239bd11e57b.png")}
                              x="0"
                              y="0"
                              width="17.21px"
                              height="13.83px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 16.97202491760254 156.490234375 C 16.82596588134766 156.4092254638672 16.65589714050293 156.4376831054688 16.53384780883789 156.5640258789063 L 15.71431255340576 157.4107971191406 C 15.62388038635254 157.5043487548828 15.57144165039063 157.6412658691406 15.57144165039063 157.7854766845703 L 15.57144165039063 161.1797180175781 L 1.639109373092651 161.1797180175781 L 1.639109373092651 151.3040771484375 L 6.218642234802246 151.3040771484375 C 6.317872047424316 151.3040771484375 6.413528442382813 151.2606506347656 6.487941265106201 151.1820983886719 C 6.813673496246338 150.8397216796875 7.165835380554199 150.5224456787109 7.534401893615723 150.2389068603516 C 7.688066959381104 150.1212310791016 7.758484363555908 149.8950958251953 7.707659244537354 149.6843566894531 C 7.656834125518799 149.4736480712891 7.4963698387146 149.3289947509766 7.314275741577148 149.3289947509766 L 1.639109373092651 149.3289947509766 C 0.7350963950157166 149.3289947509766 0 150.2147827148438 0 151.3040771484375 L 0 161.1796264648438 C 0 162.2689208984375 0.7350963950157166 163.1547546386719 1.639109373092651 163.1547546386719 L 15.57144165039063 163.1547546386719 C 16.47541618347168 163.1547546386719 17.21055221557617 162.2689819335938 17.21055221557617 161.1796264648438 L 17.21055221557617 156.9386291503906 C 17.21051406860352 156.7457580566406 17.11727714538574 156.5707397460938 16.97202491760254 156.490234375 Z"
                          fill="url(#img-path239bd11e57b)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              data-layer="51fee8f6-515d-4d71-b94f-00b31871a926"
              style={styles.x1_group55_group53}
            >
              <View
                data-layer="bd6a32d1-2ab6-43fc-b68e-3fa50b2fff21"
                style={styles.x1_group55_group53_rectangle92602ee93}
              ></View>
              <Svg
                data-layer="16e400e2-4b1c-414f-b8f0-a86cf33af7dc"
                style={styles.x1_group55_group53_line26e92df6b}
                preserveAspectRatio="none"
                viewBox="0 -0.5 357 1"
                fill="transparent"
              >
                <SvgPath d="M 0 0 L 357 0" />
              </Svg>
              <ReactImage
                data-layer="aeb24b71-4023-4a0a-8908-c63941d6a1a5"
                source={require("../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018.png")}
                style={
                  styles.x1_group55_group53_badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018
                }
              />
              <View
                data-layer="fa914d8b-ef61-41f3-a129-6458f8dd8d6a"
                style={styles.x1_group55_group53_group27fb4ad8f7}
              >
                <Text
                  data-layer="09c0f39e-808f-444b-8e77-979ef70eccd5"
                  style={
                    styles.x1_group55_group53_group27fb4ad8f7_transmissionEngineerAtOctaneAiEnthusiastProductionEngineeringStudent
                  }
                >
                  Transmission engineer at Octane | AI Enthusiast | Production
                  engineering student{" "}
                </Text>
                <Text
                  data-layer="fc777556-207e-42cd-9848-69675ac2c634"
                  style={styles.x1_group55_group53_group27fb4ad8f7_aniketJha}
                >
                  Aniket Jha{" "}
                </Text>
                <Text
                  data-layer="98f20523-1d06-482d-b34f-cb2787c41e77"
                  style={styles.x1_group55_group53_group27fb4ad8f7_student}
                >
                  Student
                </Text>
                <Svg
                  data-layer="bd6ec712-7d1f-4bec-a344-150590d30f74"
                  style={
                    styles.x1_group55_group53_group27fb4ad8f7_ellipse174b251b3
                  }
                  preserveAspectRatio="none"
                  viewBox="0 0 45 44"
                  fill="rgba(255, 255, 255, 0)"
                >
                  <Defs>
                    <Pattern
                      id="img-ellipse174b251b3"
                      patternContentUnits="userSpaceOnUse"
                      width="100%"
                      height="100%"
                    >
                      <SvgImage
                        xlinkHref={require("../assets/ellipse174b251b3.png")}
                        x="0"
                        y="0"
                        width="45.00px"
                        height="44.00px"
                      />
                    </Pattern>
                  </Defs>
                  <SvgPath
                    d="M 22.5 0 C 34.92640686035156 0 45 9.849736213684082 45 22 C 45 34.15026473999023 34.92640686035156 44 22.5 44 C 10.07359409332275 44 0 34.15026473999023 0 22 C 0 9.849736213684082 10.07359409332275 0 22.5 0 Z"
                    fill="url(#img-ellipse174b251b3)"
                  />
                </Svg>
                <View
                  data-layer="50792480-f37a-4760-b8b5-e4359a2f00cc"
                  style={
                    styles.x1_group55_group53_group27fb4ad8f7_radioButton2d572206
                  }
                >
                  <Svg
                    data-layer="990e1f37-b5db-455a-99d4-1a09fdb493b4"
                    style={
                      styles.x1_group55_group53_group27fb4ad8f7_radioButton2d572206_dot2c52c9d36
                    }
                    preserveAspectRatio="none"
                    viewBox="0 0 4 4"
                    fill="rgba(0, 0, 0, 0.6196078431372549)"
                  >
                    <SvgPath d="M 2 0 C 3.104569435119629 0 4 0.8954305648803711 4 2 C 4 3.104569435119629 3.104569435119629 4 2 4 C 0.8954305648803711 4 0 3.104569435119629 0 2 C 0 0.8954305648803711 0.8954305648803711 0 2 0 Z" />
                  </Svg>
                </View>
              </View>
              <Text
                data-layer="554f9d4b-d2f6-48f5-a78d-b3bae13d6473"
                style={
                  styles.x1_group55_group53_googleHasDevelopedAVeryExcitingApiGpt3WhichIsAnOpenSourceLibraryItCameUpWithABoomAsTheDevelopersShowedYouJustHaveToDescribeTheWebPageAndTheAiModelWillCodeItForYouIHaveDevelopedACodeUsingGpt2Tose
                }
              >
                Google has developed a very exciting API ( GPT 3) which is an
                open source library!! It came up with a boom as the developers
                showed you just have to describe the web page and the AI model
                will code it for you ! I have developed a code using GPT2
                to....see more
              </Text>
              <Svg
                data-layer="65015fbe-43a6-4409-8a5d-159cbc8ce5de"
                style={styles.x1_group55_group53_path59}
                preserveAspectRatio="none"
                viewBox="-0.75 11.25 1.5 1.5"
                fill="transparent"
              >
                <SvgPath d="M 0 12" />
              </Svg>
              <Svg
                data-layer="429b097f-c0a3-4a08-a1e3-088ef4fb7e26"
                style={styles.x1_group55_group53_path60}
                preserveAspectRatio="none"
                viewBox="-0.75 11.25 1.5 1.5"
                fill="transparent"
              >
                <SvgPath d="M 0 12" />
              </Svg>
              <View
                data-layer="5546b51c-f890-41dc-8e83-61cf5f2f07e1"
                style={styles.x1_group55_group53_group285a04c7fd}
              >
                <View
                  data-layer="6e7f0826-9e3c-4659-83fe-8e978c384892"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_rectangle109c61166a
                  }
                ></View>
                <View
                  data-layer="82a88491-d0ac-4ef2-9a30-55afad49edab"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_rectangle117851100d
                  }
                ></View>
                <View
                  data-layer="ab00f45c-b6b8-4e23-ae0c-51b1cf13e4ae"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_rectangle123167b487
                  }
                ></View>
                <View
                  data-layer="92d3d91f-0957-4aa7-8df0-487fc5c0b866"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_rectangle136ac38321
                  }
                ></View>
                <Text
                  data-layer="e405db22-cdb0-4e63-9787-765f226b62a1"
                  style={styles.x1_group55_group53_group285a04c7fd_like90ae7232}
                >
                  Like
                </Text>
                <Text
                  data-layer="a45075b8-da10-4b6e-b0fb-3535be8f9887"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_comment6d1d50c5
                  }
                >
                  Comment
                </Text>
                <View
                  data-layer="6952e57b-7b27-4825-9fa0-1d36b63ff78a"
                  style={styles.x1_group55_group53_group285a04c7fd_like3ba89d20}
                >
                  <View
                    data-layer="9318a78c-2b8f-4435-bebb-13f53d69836e"
                    style={
                      styles.x1_group55_group53_group285a04c7fd_like3ba89d20_group1260a42e4ef3
                    }
                  >
                    <View
                      data-layer="52d07875-f8ba-4a67-abc3-edb2a38bb449"
                      style={
                        styles.x1_group55_group53_group285a04c7fd_like3ba89d20_group1260a42e4ef3_group125948e14fb2
                      }
                    >
                      <Svg
                        data-layer="e6e2202b-0df6-4bec-aed0-38ff825ff68c"
                        style={
                          styles.x1_group55_group53_group285a04c7fd_like3ba89d20_group1260a42e4ef3_group125948e14fb2_path2365cb28415
                        }
                        preserveAspectRatio="none"
                        viewBox="-1.1920928955078125e-7 224 4.5538330078125 8.4571533203125"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path2365cb28415"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path2365cb28415.png")}
                              x="0"
                              y="0"
                              width="4.55px"
                              height="8.46px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 1.626360058784485 224 C 0.7299149632453918 224 0 224.7299194335938 0 225.6263732910156 L 0 230.8307647705078 C 0 231.7272033691406 0.7299149632453918 232.4571228027344 1.626360058784485 232.4571228027344 L 3.578004360198975 232.4571228027344 C 3.944272756576538 232.4571228027344 4.28123664855957 232.3335266113281 4.553826808929443 232.1279296875 L 4.553826808929443 224 L 1.626360058784485 224 Z"
                          fill="url(#img-path2365cb28415)"
                        />
                      </Svg>
                    </View>
                  </View>
                  <View
                    data-layer="1c1398ba-ad18-4048-bc33-45e177bfe1c6"
                    style={
                      styles.x1_group55_group53_group285a04c7fd_like3ba89d20_group1262c742cb36
                    }
                  >
                    <View
                      data-layer="23b607d7-f1ac-4cd0-969d-8af2d670db39"
                      style={
                        styles.x1_group55_group53_group285a04c7fd_like3ba89d20_group1262c742cb36_group12611bcf0d3c
                      }
                    >
                      <Svg
                        data-layer="7748195f-d741-4b4c-bcb5-6fad3b569ad1"
                        style={
                          styles.x1_group55_group53_group285a04c7fd_like3ba89d20_group1262c742cb36_group12611bcf0d3c_path23760f96ef1
                        }
                        preserveAspectRatio="none"
                        viewBox="170.6669921875 10.666976928710938 10.40875244140625 14.31201171875"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path23760f96ef1"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path23760f96ef1.png")}
                              x="0"
                              y="0"
                              width="10.41px"
                              height="14.31px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 181.0757446289063 19.61200332641602 C 181.0757446289063 19.22103500366211 180.9209289550781 18.85671615600586 180.6522369384766 18.58803176879883 C 180.9560546875 18.25561141967773 181.1108703613281 17.80996513366699 181.0685729980469 17.34614372253418 C 180.9924621582031 16.519287109375 180.2475738525391 15.87134170532227 179.3719635009766 15.87134170532227 L 175.353515625 15.87134170532227 C 175.5525970458984 15.26697158813477 175.8713531494141 14.15910911560059 175.8713531494141 13.2691593170166 C 175.8713531494141 11.85811996459961 174.6723937988281 10.66697692871094 173.9197082519531 10.66697692871094 C 173.2437896728516 10.66697692871094 172.7610626220703 11.04754829406738 172.7402648925781 11.06316089630127 C 172.6635131835938 11.12497329711914 172.6186218261719 11.21865272521973 172.6186218261719 11.31751537322998 L 172.6186218261719 13.52351379394531 L 170.7450561523438 17.5822925567627 L 170.6669921875 17.62196731567383 L 170.6669921875 24.59455108642578 C 171.1965179443359 24.84436225891113 171.8665771484375 24.97902679443359 172.2933502197266 24.97902679443359 L 178.2647399902344 24.97902679443359 C 178.9731750488281 24.97902679443359 179.5931701660156 24.50151252746582 179.7388610839844 23.84252738952637 C 179.8136749267578 23.50358200073242 179.7700958251953 23.16204452514648 179.6211242675781 22.86539459228516 C 180.1018676757813 22.62339019775391 180.4252014160156 22.1283130645752 180.4252014160156 21.56364822387695 C 180.4252014160156 21.33335494995117 180.3725128173828 21.11281967163086 180.2723388671875 20.91310882568359 C 180.7530822753906 20.67110443115234 181.0757446289063 20.17602920532227 181.0757446289063 19.61200332641602 Z"
                          fill="url(#img-path23760f96ef1)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
                <View
                  data-layer="8d60978f-9153-4ac4-a3f7-a10e756138c5"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_chatBubblesWithEllipsis12a07df00
                  }
                >
                  <Svg
                    data-layer="786e42b9-c399-4c1e-bc52-98785c197a19"
                    style={
                      styles.x1_group55_group53_group285a04c7fd_chatBubblesWithEllipsis12a07df00_path22764c3c28e
                    }
                    preserveAspectRatio="none"
                    viewBox="0 3.239999532699585 17.67047119140625 14.179931640625"
                    fill="transparent"
                  >
                    <Defs>
                      <Pattern
                        id="img-path22764c3c28e"
                        patternContentUnits="userSpaceOnUse"
                        width="100%"
                        height="100%"
                      >
                        <SvgImage
                          xlinkHref={require("../assets/path22764c3c28e.png")}
                          x="0"
                          y="0"
                          width="17.67px"
                          height="14.18px"
                        />
                      </Pattern>
                    </Defs>
                    <SvgPath
                      d="M 15.46981716156006 3.239999532699585 L 2.461630821228027 3.239999532699585 C 1.317129135131836 3.239999532699585 0 4.256734371185303 0 5.236770153045654 L 0 13.12055110931396 C 0 14.02310657501221 1.115957260131836 14.67487812042236 2.186380386352539 14.77546501159668 L 1.489755630493164 17.41993141174316 L 5.953588485717773 14.79381370544434 L 15.46981906890869 14.79381370544434 C 16.61432075500488 14.79381370544434 17.67047119140625 14.0999059677124 17.67047119140625 13.12055110931396 L 17.67047119140625 6.742164611816406 L 17.67047119140625 5.236770153045654 C 17.67047119140625 4.256734371185303 16.61363983154297 3.239999532699585 15.46981716156006 3.239999532699585 Z M 4.446160316467285 9.894996643066406 C 3.797110557556152 9.894996643066406 3.271075248718262 9.368959426879883 3.271075248718262 8.719905853271484 C 3.271075248718262 8.070853233337402 3.797110557556152 7.544815540313721 4.446160316467285 7.544815540313721 C 5.09453296661377 7.544815540313721 5.621248245239258 8.070853233337402 5.621248245239258 8.719905853271484 C 5.621248245239258 9.368959426879883 5.09453296661377 9.894996643066406 4.446160316467285 9.894996643066406 Z M 8.835235595703125 9.894996643066406 C 8.186184883117676 9.894996643066406 7.660148620605469 9.368959426879883 7.660148620605469 8.719905853271484 C 7.660148620605469 8.070853233337402 8.186184883117676 7.544815540313721 8.835235595703125 7.544815540313721 C 9.484284400939941 7.544815540313721 10.01032161712646 8.070853233337402 10.01032161712646 8.719905853271484 C 10.01032161712646 9.368959426879883 9.484284400939941 9.894996643066406 8.835235595703125 9.894996643066406 Z M 13.22498798370361 9.894996643066406 C 12.57593822479248 9.894996643066406 12.04922294616699 9.368959426879883 12.04922294616699 8.719905853271484 C 12.04922294616699 8.070853233337402 12.57593822479248 7.544815540313721 13.22498798370361 7.544815540313721 C 13.87267875671387 7.544815540313721 14.40007400512695 8.070853233337402 14.40007400512695 8.719905853271484 C 14.40007400512695 9.368959426879883 13.87267971038818 9.894996643066406 13.22498798370361 9.894996643066406 Z"
                      fill="url(#img-path22764c3c28e)"
                    />
                  </Svg>
                </View>
                <Text
                  data-layer="63e1db2b-5484-4d09-bf88-afeebce66e59"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_bookmark00c1e84c
                  }
                >
                  Bookmark
                </Text>
                <View
                  data-layer="aff79f96-0d49-4fb8-95ae-cdff140bfde9"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_bookmarka259e90f
                  }
                >
                  <View
                    data-layer="5058f11b-967c-4763-a976-233800743be9"
                    style={
                      styles.x1_group55_group53_group285a04c7fd_bookmarka259e90f_group1227d7e23dfc
                    }
                  >
                    <Svg
                      data-layer="63c11c22-4aae-46dd-a566-26f3f5cf0444"
                      style={
                        styles.x1_group55_group53_group285a04c7fd_bookmarka259e90f_group1227d7e23dfc_path216f57cb052
                      }
                      preserveAspectRatio="none"
                      viewBox="105.91800689697266 -0.75 11.12701416015625 16.525634765625"
                      fill="transparent"
                    >
                      <Defs>
                        <Pattern
                          id="img-path216f57cb052"
                          patternContentUnits="userSpaceOnUse"
                          width="100%"
                          height="100%"
                        >
                          <SvgImage
                            xlinkHref={require("../assets/path216f57cb052.png")}
                            x="0"
                            y="0"
                            width="9.63px"
                            height="15.03px"
                          />
                        </Pattern>
                      </Defs>
                      <SvgPath
                        d="M 114.919792175293 0 L 108.0433120727539 0 C 107.2851486206055 0 106.6680068969727 0.5615495443344116 106.6680068969727 1.252136588096619 L 106.6680068969727 14.71250915527344 C 106.6680068969727 14.83174419403076 106.7425689697266 14.9405632019043 106.8600540161133 14.99344539642334 C 106.9789276123047 15.04603576660156 107.117919921875 15.03350257873535 107.2213287353516 14.96072387695313 L 111.4815444946289 11.97712993621826 L 115.7417526245117 14.96072387695313 C 115.8028717041016 15.00351238250732 115.8767395019531 15.02552127838135 115.9512710571289 15.02552127838135 C 116.0029830932617 15.02552127838135 116.0546798706055 15.01480960845947 116.10302734375 14.99341583251953 C 116.2205581665039 14.94053363800049 116.2950744628906 14.83171653747559 116.2950744628906 14.71248054504395 L 116.2950744628906 1.252136588096619 C 116.2951049804688 0.5615495443344116 115.6779632568359 0 114.919792175293 0 Z"
                        fill="url(#img-path216f57cb052)"
                      />
                    </Svg>
                  </View>
                </View>
                <Text
                  data-layer="c36ed5bd-594f-4687-845c-8d41c2c16aa7"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_share324c9102
                  }
                >
                  Share
                </Text>
                <View
                  data-layer="98413625-82ce-491b-8426-8bfbc7e7566a"
                  style={
                    styles.x1_group55_group53_group285a04c7fd_share016666d8
                  }
                >
                  <View
                    data-layer="d25934df-bfa3-4adb-a56a-1ccc5b32940e"
                    style={
                      styles.x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4
                    }
                  >
                    <View
                      data-layer="274a8363-406f-4302-ac63-b6adf48e7b98"
                      style={
                        styles.x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4_group1263a9991fff
                      }
                    >
                      <Svg
                        data-layer="d00cd70c-4711-44fd-b5cd-b4f997045b6b"
                        style={
                          styles.x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4_group1263a9991fff_path238a3a2a366
                        }
                        preserveAspectRatio="none"
                        viewBox="106.66697692871094 64.0044937133789 15.57122802734375 12.29241943359375"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path238a3a2a366"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path238a3a2a366.png")}
                              x="0"
                              y="0"
                              width="15.57px"
                              height="12.29px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 122.0951385498047 69.020263671875 L 116.3583068847656 64.10297393798828 C 116.2374572753906 63.99893951416016 116.0670013427734 63.97531127929688 115.9205169677734 64.04174041748047 C 115.7752685546875 64.10858154296875 115.6820220947266 64.25382995605469 115.6820220947266 64.41391754150391 L 115.6820220947266 67.28795623779297 C 111.1032562255859 67.41522979736328 108.8943176269531 69.68174743652344 107.8442840576172 71.59177398681641 C 106.9311065673828 73.25209045410156 106.7262268066406 74.89596557617188 106.6801910400391 75.57066345214844 C 106.6714019775391 75.67392730712891 106.6669769287109 75.77915191650391 106.6669769287109 75.88640594482422 L 106.6669769287109 75.88760375976563 C 106.6669769287109 75.88760375976563 106.6669769287109 75.88798522949219 106.6669769287109 75.88841247558594 L 106.6669769287109 75.8887939453125 C 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 L 106.6669769287109 75.89037322998047 L 106.6669769287109 75.89075469970703 C 106.6669769287109 75.89075469970703 106.6669769287109 75.89113616943359 106.6669769287109 75.89156341552734 L 106.6669769287109 75.89194488525391 C 106.6669769287109 75.89232635498047 106.6669769287109 75.89275360107422 106.6669769287109 75.89275360107422 C 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 L 106.6669769287109 75.89432525634766 C 106.6669769287109 75.89471435546875 106.6669769287109 75.89513397216797 106.6669769287109 75.89551544189453 C 106.6669769287109 75.89551544189453 106.6669769287109 75.89590454101563 106.6669769287109 75.89670562744141 L 106.6669769287109 75.8970947265625 L 106.6669769287109 75.89789581298828 L 106.6669769287109 75.89828491210938 C 106.6669769287109 75.89866638183594 106.6669769287109 75.89909362792969 106.6669769287109 75.89947509765625 L 106.6673736572266 75.90066528320313 C 106.6673736572266 75.90066528320313 106.6673736572266 75.90066528320313 106.6673736572266 75.90104675292969 C 106.6673736572266 75.90185546875 106.6673736572266 75.90224456787109 106.6673736572266 75.90224456787109 C 106.6673736572266 75.90262603759766 106.6673736572266 75.90304565429688 106.6673736572266 75.90343475341797 L 106.6673736572266 75.90462493896484 L 106.6673736572266 75.90581512451172 L 106.6673736572266 75.90619659423828 L 106.6673736572266 75.90738677978516 C 106.6673736572266 75.90777587890625 106.6673736572266 75.908203125 106.6673736572266 75.90857696533203 C 106.6673736572266 75.90857696533203 106.6673736572266 75.90939331054688 106.6677551269531 75.90976715087891 C 106.6677551269531 75.90976715087891 106.6677551269531 75.91016387939453 106.6677551269531 75.91096496582031 L 106.6677551269531 75.91135406494141 C 106.6677551269531 75.91172790527344 106.6677551269531 75.91215515136719 106.6677551269531 75.91254425048828 L 106.6677551269531 75.91373443603516 C 106.6677551269531 75.91411590576172 106.6677551269531 75.91453552246094 106.6677551269531 75.91492462158203 C 106.6673736572266 75.91611480712891 106.6685638427734 75.91653442382813 106.6681365966797 75.91653442382813 L 106.6681365966797 75.917724609375 C 106.6681365966797 75.91811370849609 106.6681365966797 75.91853332519531 106.6681365966797 75.91891479492188 L 106.6681365966797 75.92011260986328 C 106.6681365966797 75.92091369628906 106.6685180664063 75.92172241210938 106.6685180664063 75.92172241210938 L 106.6685180664063 75.92291259765625 C 106.6685180664063 75.92330169677734 106.6685180664063 75.92372131347656 106.6685180664063 75.92410278320313 L 106.6685180664063 75.92449188232422 L 106.6685180664063 75.92529296875 L 106.6685180664063 75.92568206787109 L 106.6688995361328 75.92648315429688 L 106.6688995361328 75.92687225341797 C 106.6688995361328 75.92725372314453 106.6688995361328 75.92767333984375 106.6688995361328 75.92767333984375 C 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 L 106.6688995361328 75.92926025390625 L 106.6688995361328 75.92963409423828 C 106.6692962646484 75.93002319335938 106.6692962646484 75.93002319335938 106.6692962646484 75.93045043945313 C 106.6692962646484 75.93045043945313 106.6692962646484 75.93082427978516 106.6692962646484 75.93125152587891 L 106.6692962646484 75.931640625 C 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 L 106.6692962646484 75.93283081054688 C 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 C 106.669677734375 75.93440246582031 106.669677734375 75.93482971191406 106.669677734375 75.93521118164063 L 106.669677734375 75.93559265136719 L 106.669677734375 75.9364013671875 L 106.669677734375 75.93678283691406 C 106.6700592041016 75.93717193603516 106.6700592041016 75.93759155273438 106.6700592041016 75.93759155273438 C 106.6700592041016 75.93840026855469 106.6700592041016 75.93878173828125 106.6700592041016 75.93878173828125 C 106.6956787109375 76.14085388183594 106.8681335449219 76.29694366455078 107.0766143798828 76.29694366455078 C 107.3027038574219 76.29694366455078 107.4859771728516 76.11408233642578 107.4864044189453 75.88796234130859 L 107.4864044189453 75.8875732421875 C 107.4864044189453 75.86675262451172 107.4867858886719 75.81592559814453 107.4904022216797 75.73832702636719 C 107.6692657470703 72.33087921142578 113.96435546875 71.55774688720703 115.681884765625 71.41007232666016 L 115.681884765625 74.24807739257813 C 115.681884765625 74.40816497802734 115.7751159667969 74.55341339111328 115.9203643798828 74.62026214599609 C 116.0664215087891 74.68667602539063 116.2364959716797 74.66347503662109 116.358154296875 74.55902099609375 L 122.0949859619141 69.64173126220703 C 122.1858367919922 69.56409454345703 122.2382354736328 69.45045471191406 122.2382354736328 69.33078765869141 C 122.2383880615234 69.21154022216797 122.1859588623047 69.097900390625 122.0951385498047 69.020263671875 Z"
                          fill="url(#img-path238a3a2a366)"
                        />
                      </Svg>
                      <Svg
                        data-layer="a6925d81-5bb8-4452-bc4b-eb709839609a"
                        style={
                          styles.x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4_group1263a9991fff_path23991552ac8
                        }
                        preserveAspectRatio="none"
                        viewBox="0 149.32899475097656 17.2105712890625 13.8258056640625"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path23991552ac8"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path23991552ac8.png")}
                              x="0"
                              y="0"
                              width="17.21px"
                              height="13.83px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 16.97202491760254 156.490234375 C 16.82596588134766 156.4092254638672 16.65589714050293 156.4376831054688 16.53384780883789 156.5640258789063 L 15.71431255340576 157.4107971191406 C 15.62388038635254 157.5043487548828 15.57144165039063 157.6412658691406 15.57144165039063 157.7854766845703 L 15.57144165039063 161.1797180175781 L 1.639109373092651 161.1797180175781 L 1.639109373092651 151.3040771484375 L 6.218642234802246 151.3040771484375 C 6.317872047424316 151.3040771484375 6.413528442382813 151.2606506347656 6.487941265106201 151.1820983886719 C 6.813673496246338 150.8397216796875 7.165835380554199 150.5224456787109 7.534401893615723 150.2389068603516 C 7.688066959381104 150.1212310791016 7.758484363555908 149.8950958251953 7.707659244537354 149.6843566894531 C 7.656834125518799 149.4736480712891 7.4963698387146 149.3289947509766 7.314275741577148 149.3289947509766 L 1.639109373092651 149.3289947509766 C 0.7350963950157166 149.3289947509766 0 150.2147827148438 0 151.3040771484375 L 0 161.1796264648438 C 0 162.2689208984375 0.7350963950157166 163.1547546386719 1.639109373092651 163.1547546386719 L 15.57144165039063 163.1547546386719 C 16.47541618347168 163.1547546386719 17.21055221557617 162.2689819335938 17.21055221557617 161.1796264648438 L 17.21055221557617 156.9386291503906 C 17.21051406860352 156.7457580566406 17.11727714538574 156.5707397460938 16.97202491760254 156.490234375 Z"
                          fill="url(#img-path23991552ac8)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
              </View>
              <View
                data-layer="d3171ac8-d7c5-4e45-8c52-0f1d2cd048b0"
                style={styles.x1_group55_group53_group1249750e5895}
              >
                <View
                  data-layer="6a265c47-49ef-4630-9226-960af2d4c1b7"
                  style={
                    styles.x1_group55_group53_group1249750e5895_rectangle352e3d6b27d
                  }
                ></View>
                <Text
                  data-layer="deb71083-043d-45b8-9934-31edb4e7c951"
                  style={
                    styles.x1_group55_group53_group1249750e5895_x42Comments
                  }
                >
                  42 comments
                </Text>
              </View>
            </View>
            <View
              data-layer="96aa5f72-e684-40ee-aeeb-5dc9251d71ed"
              style={styles.x1_group55_group54}
            >
              <View
                data-layer="24b90d74-0c36-4b32-9c2d-f1978cec7dab"
                style={styles.x1_group55_group54_rectangle92987052f}
              ></View>
              <Svg
                data-layer="6db8c214-5837-4bd3-ad11-a7a0ac7c1c5a"
                style={styles.x1_group55_group54_line2aa2d41cf}
                preserveAspectRatio="none"
                viewBox="0 -0.5 357 1"
                fill="transparent"
              >
                <SvgPath d="M 0 0 L 357 0" />
              </Svg>
              <ReactImage
                data-layer="0f96286e-d32c-482a-8fbd-d3f6f1111d1c"
                source={require("../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194687a23e9fb.png")}
                style={
                  styles.x1_group55_group54_badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194687a23e9fb
                }
              />
              <View
                data-layer="e27e668d-8a2c-4be9-aaab-e8d8f3dd6c94"
                style={styles.x1_group55_group54_group275aa4a357}
              >
                <Text
                  data-layer="eb5f690a-ec81-48d8-b729-d25dd4ab0b0d"
                  style={
                    styles.x1_group55_group54_group275aa4a357_facultyAtElectricalDeptCoepResearchInBatterytechnology
                  }
                >
                  Faculty at Electrical Dept, COEP | Research in Battery
                  technology
                </Text>
                <Text
                  data-layer="f51d8818-d5ac-48dc-8199-b78077837b23"
                  style={
                    styles.x1_group55_group54_group275aa4a357_sachinMandale
                  }
                >
                  Sachin Mandale
                </Text>
                <Svg
                  data-layer="d437b3b0-4f89-41d0-9785-f4bc578c6517"
                  style={
                    styles.x1_group55_group54_group275aa4a357_ellipse1adfd341c
                  }
                  preserveAspectRatio="none"
                  viewBox="0 0 45 44"
                  fill="rgba(255, 255, 255, 0)"
                >
                  <Defs>
                    <Pattern
                      id="img-ellipse1adfd341c"
                      patternContentUnits="userSpaceOnUse"
                      width="100%"
                      height="100%"
                    >
                      <SvgImage
                        xlinkHref={require("../assets/ellipse1adfd341c.png")}
                        x="0"
                        y="0"
                        width="45.00px"
                        height="44.00px"
                      />
                    </Pattern>
                  </Defs>
                  <SvgPath
                    d="M 22.5 0 C 34.92640686035156 0 45 9.849736213684082 45 22 C 45 34.15026473999023 34.92640686035156 44 22.5 44 C 10.07359409332275 44 0 34.15026473999023 0 22 C 0 9.849736213684082 10.07359409332275 0 22.5 0 Z"
                    fill="url(#img-ellipse1adfd341c)"
                  />
                </Svg>
                <Text
                  data-layer="3bf5a010-f937-438d-bfa6-41d8fd23db49"
                  style={styles.x1_group55_group54_group275aa4a357_professor}
                >
                  Professor
                </Text>
                <View
                  data-layer="3ef88e05-5757-42b5-af74-01009a2fa6d1"
                  style={styles.x1_group55_group54_group275aa4a357_radioButton}
                >
                  <Svg
                    data-layer="cee0bc5c-4986-4985-be9d-f3c66cfe5240"
                    style={
                      styles.x1_group55_group54_group275aa4a357_radioButton_dot2
                    }
                    preserveAspectRatio="none"
                    viewBox="0 0 4 4"
                    fill="rgba(0, 0, 0, 0.6196078431372549)"
                  >
                    <SvgPath d="M 2 0 C 3.104569435119629 0 4 0.8954305648803711 4 2 C 4 3.104569435119629 3.104569435119629 4 2 4 C 0.8954305648803711 4 0 3.104569435119629 0 2 C 0 0.8954305648803711 0.8954305648803711 0 2 0 Z" />
                  </Svg>
                </View>
              </View>
              <Text
                data-layer="4faa0c11-e3c2-4052-9168-57ebbc118877"
                style={
                  styles.x1_group55_group54_studentsOftenAskMeTheBestPracticesToIncreaseTheBatteryLifetimeInMyResearchIHaveFoundVariousParametersThatAffectseeMore
                }
              >
                Students often ask me the best practices to increase the battery
                lifetime, In my research I have found various parameters that
                affect....see more
              </Text>
              <View
                data-layer="59e8e700-c399-47c2-a2b6-0ce10030e63a"
                style={styles.x1_group55_group54_group1249}
              >
                <View
                  data-layer="3b779daa-cc9e-45a3-a27b-49d4098e03a1"
                  style={
                    styles.x1_group55_group54_group1249_rectangle3522a33c80b
                  }
                ></View>
                <Text
                  data-layer="47191412-54c8-4b04-b75c-acc4f3d45744"
                  style={styles.x1_group55_group54_group1249_x51Comments}
                >
                  51 comments
                </Text>
              </View>
              <View
                data-layer="e5960d22-88b1-4322-9468-4b50c85490d9"
                style={styles.x1_group55_group54_group1275}
              >
                <View
                  data-layer="0a837b3d-4c74-4f57-945e-2ef2a4f9b192"
                  style={
                    styles.x1_group55_group54_group1275_rectangle109b0449a0
                  }
                ></View>
                <View
                  data-layer="eeca9cf8-a5fd-4d30-b016-c35b489448ae"
                  style={
                    styles.x1_group55_group54_group1275_rectangle1106c6ee4b
                  }
                ></View>
                <View
                  data-layer="1183938d-9785-4d0f-b323-d1da36b1d6db"
                  style={
                    styles.x1_group55_group54_group1275_rectangle12835de200
                  }
                ></View>
                <View
                  data-layer="e7c12443-3ae1-47ef-9cc4-a9246404ad4c"
                  style={
                    styles.x1_group55_group54_group1275_rectangle13a286aa27
                  }
                ></View>
                <Text
                  data-layer="0fce414f-9e30-49b9-b8c2-8d519891dbcd"
                  style={styles.x1_group55_group54_group1275_like13c03daf}
                >
                  Like
                </Text>
                <Text
                  data-layer="377cd339-51d5-4ba8-b4a4-6d69cd67d3a2"
                  style={styles.x1_group55_group54_group1275_commentd5d26a6f}
                >
                  Comment
                </Text>
                <View
                  data-layer="256e51f9-a81b-4660-91ef-102f12782bcc"
                  style={styles.x1_group55_group54_group1275_like97c45dc2}
                >
                  <View
                    data-layer="f7ab73de-d2f9-4831-b35d-29f65c53d11f"
                    style={
                      styles.x1_group55_group54_group1275_like97c45dc2_group1260e78dafcb
                    }
                  >
                    <View
                      data-layer="e3e29546-c83c-450d-84a5-ef604aa2255f"
                      style={
                        styles.x1_group55_group54_group1275_like97c45dc2_group1260e78dafcb_group12598529c826
                      }
                    >
                      <Svg
                        data-layer="76694b1d-9a17-4689-a645-4897c0c5b514"
                        style={
                          styles.x1_group55_group54_group1275_like97c45dc2_group1260e78dafcb_group12598529c826_path2367a4df154
                        }
                        preserveAspectRatio="none"
                        viewBox="-1.1920928955078125e-7 224 4.5538330078125 8.4571533203125"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path2367a4df154"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path2367a4df154.png")}
                              x="0"
                              y="0"
                              width="4.55px"
                              height="8.46px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 1.626360058784485 224 C 0.7299149632453918 224 0 224.7299194335938 0 225.6263732910156 L 0 230.8307647705078 C 0 231.7272033691406 0.7299149632453918 232.4571228027344 1.626360058784485 232.4571228027344 L 3.578004360198975 232.4571228027344 C 3.944272756576538 232.4571228027344 4.28123664855957 232.3335266113281 4.553826808929443 232.1279296875 L 4.553826808929443 224 L 1.626360058784485 224 Z"
                          fill="url(#img-path2367a4df154)"
                        />
                      </Svg>
                    </View>
                  </View>
                  <View
                    data-layer="2ab0e258-704e-4e99-9d2c-2c9038e54117"
                    style={
                      styles.x1_group55_group54_group1275_like97c45dc2_group12628b94dd78
                    }
                  >
                    <View
                      data-layer="898ac647-e132-4bd7-b64b-26192f60564f"
                      style={
                        styles.x1_group55_group54_group1275_like97c45dc2_group12628b94dd78_group1261552d30dd
                      }
                    >
                      <Svg
                        data-layer="74d35d7f-dd63-4c25-8ef4-edd394fb504a"
                        style={
                          styles.x1_group55_group54_group1275_like97c45dc2_group12628b94dd78_group1261552d30dd_path2377a7e62a2
                        }
                        preserveAspectRatio="none"
                        viewBox="170.6669921875 10.666976928710938 10.40875244140625 14.31201171875"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path2377a7e62a2"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path2377a7e62a2.png")}
                              x="0"
                              y="0"
                              width="10.41px"
                              height="14.31px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 181.0757446289063 19.61200332641602 C 181.0757446289063 19.22103500366211 180.9209289550781 18.85671615600586 180.6522369384766 18.58803176879883 C 180.9560546875 18.25561141967773 181.1108703613281 17.80996513366699 181.0685729980469 17.34614372253418 C 180.9924621582031 16.519287109375 180.2475738525391 15.87134170532227 179.3719635009766 15.87134170532227 L 175.353515625 15.87134170532227 C 175.5525970458984 15.26697158813477 175.8713531494141 14.15910911560059 175.8713531494141 13.2691593170166 C 175.8713531494141 11.85811996459961 174.6723937988281 10.66697692871094 173.9197082519531 10.66697692871094 C 173.2437896728516 10.66697692871094 172.7610626220703 11.04754829406738 172.7402648925781 11.06316089630127 C 172.6635131835938 11.12497329711914 172.6186218261719 11.21865272521973 172.6186218261719 11.31751537322998 L 172.6186218261719 13.52351379394531 L 170.7450561523438 17.5822925567627 L 170.6669921875 17.62196731567383 L 170.6669921875 24.59455108642578 C 171.1965179443359 24.84436225891113 171.8665771484375 24.97902679443359 172.2933502197266 24.97902679443359 L 178.2647399902344 24.97902679443359 C 178.9731750488281 24.97902679443359 179.5931701660156 24.50151252746582 179.7388610839844 23.84252738952637 C 179.8136749267578 23.50358200073242 179.7700958251953 23.16204452514648 179.6211242675781 22.86539459228516 C 180.1018676757813 22.62339019775391 180.4252014160156 22.1283130645752 180.4252014160156 21.56364822387695 C 180.4252014160156 21.33335494995117 180.3725128173828 21.11281967163086 180.2723388671875 20.91310882568359 C 180.7530822753906 20.67110443115234 181.0757446289063 20.17602920532227 181.0757446289063 19.61200332641602 Z"
                          fill="url(#img-path2377a7e62a2)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
                <View
                  data-layer="e9b1bb38-a018-43f4-9812-1a809d864c90"
                  style={
                    styles.x1_group55_group54_group1275_chatBubblesWithEllipsis103e7426a
                  }
                >
                  <Svg
                    data-layer="cea933a3-0380-4c42-8a1b-5bc5b2572e15"
                    style={
                      styles.x1_group55_group54_group1275_chatBubblesWithEllipsis103e7426a_path227dcc55359
                    }
                    preserveAspectRatio="none"
                    viewBox="0 3.239999532699585 17.67047119140625 14.179931640625"
                    fill="transparent"
                  >
                    <Defs>
                      <Pattern
                        id="img-path227dcc55359"
                        patternContentUnits="userSpaceOnUse"
                        width="100%"
                        height="100%"
                      >
                        <SvgImage
                          xlinkHref={require("../assets/path227dcc55359.png")}
                          x="0"
                          y="0"
                          width="17.67px"
                          height="14.18px"
                        />
                      </Pattern>
                    </Defs>
                    <SvgPath
                      d="M 15.46981716156006 3.239999532699585 L 2.461630821228027 3.239999532699585 C 1.317129135131836 3.239999532699585 0 4.256734371185303 0 5.236770153045654 L 0 13.12055110931396 C 0 14.02310657501221 1.115957260131836 14.67487812042236 2.186380386352539 14.77546501159668 L 1.489755630493164 17.41993141174316 L 5.953588485717773 14.79381370544434 L 15.46981906890869 14.79381370544434 C 16.61432075500488 14.79381370544434 17.67047119140625 14.0999059677124 17.67047119140625 13.12055110931396 L 17.67047119140625 6.742164611816406 L 17.67047119140625 5.236770153045654 C 17.67047119140625 4.256734371185303 16.61363983154297 3.239999532699585 15.46981716156006 3.239999532699585 Z M 4.446160316467285 9.894996643066406 C 3.797110557556152 9.894996643066406 3.271075248718262 9.368959426879883 3.271075248718262 8.719905853271484 C 3.271075248718262 8.070853233337402 3.797110557556152 7.544815540313721 4.446160316467285 7.544815540313721 C 5.09453296661377 7.544815540313721 5.621248245239258 8.070853233337402 5.621248245239258 8.719905853271484 C 5.621248245239258 9.368959426879883 5.09453296661377 9.894996643066406 4.446160316467285 9.894996643066406 Z M 8.835235595703125 9.894996643066406 C 8.186184883117676 9.894996643066406 7.660148620605469 9.368959426879883 7.660148620605469 8.719905853271484 C 7.660148620605469 8.070853233337402 8.186184883117676 7.544815540313721 8.835235595703125 7.544815540313721 C 9.484284400939941 7.544815540313721 10.01032161712646 8.070853233337402 10.01032161712646 8.719905853271484 C 10.01032161712646 9.368959426879883 9.484284400939941 9.894996643066406 8.835235595703125 9.894996643066406 Z M 13.22498798370361 9.894996643066406 C 12.57593822479248 9.894996643066406 12.04922294616699 9.368959426879883 12.04922294616699 8.719905853271484 C 12.04922294616699 8.070853233337402 12.57593822479248 7.544815540313721 13.22498798370361 7.544815540313721 C 13.87267875671387 7.544815540313721 14.40007400512695 8.070853233337402 14.40007400512695 8.719905853271484 C 14.40007400512695 9.368959426879883 13.87267971038818 9.894996643066406 13.22498798370361 9.894996643066406 Z"
                      fill="url(#img-path227dcc55359)"
                    />
                  </Svg>
                </View>
                <Text
                  data-layer="1e33b751-1660-45bc-9bcc-b3b6fca93ade"
                  style={styles.x1_group55_group54_group1275_bookmarkf40c8189}
                >
                  Bookmark
                </Text>
                <View
                  data-layer="4b1fa189-092a-4b6d-8f47-10621bfd6957"
                  style={styles.x1_group55_group54_group1275_bookmarka6ef9917}
                >
                  <View
                    data-layer="5579262e-69f3-4eca-8567-1eb4747411fc"
                    style={
                      styles.x1_group55_group54_group1275_bookmarka6ef9917_group1227980c1733
                    }
                  >
                    <Svg
                      data-layer="493edd78-ce03-43aa-8c2c-dd3239cae0af"
                      style={
                        styles.x1_group55_group54_group1275_bookmarka6ef9917_group1227980c1733_path2167ba619a8
                      }
                      preserveAspectRatio="none"
                      viewBox="105.91800689697266 -0.75 11.12701416015625 16.525634765625"
                      fill="transparent"
                    >
                      <SvgPath d="M 114.919792175293 0 L 108.0433120727539 0 C 107.2851486206055 0 106.6680068969727 0.5615495443344116 106.6680068969727 1.252136588096619 L 106.6680068969727 14.71250915527344 C 106.6680068969727 14.83174419403076 106.7425689697266 14.9405632019043 106.8600540161133 14.99344539642334 C 106.9789276123047 15.04603576660156 107.117919921875 15.03350257873535 107.2213287353516 14.96072387695313 L 111.4815444946289 11.97712993621826 L 115.7417526245117 14.96072387695313 C 115.8028717041016 15.00351238250732 115.8767395019531 15.02552127838135 115.9512710571289 15.02552127838135 C 116.0029830932617 15.02552127838135 116.0546798706055 15.01480960845947 116.10302734375 14.99341583251953 C 116.2205581665039 14.94053363800049 116.2950744628906 14.83171653747559 116.2950744628906 14.71248054504395 L 116.2950744628906 1.252136588096619 C 116.2951049804688 0.5615495443344116 115.6779632568359 0 114.919792175293 0 Z" />
                    </Svg>
                  </View>
                </View>
                <Text
                  data-layer="eb9d64ab-b5e9-431f-a5fc-cdded366fdf6"
                  style={styles.x1_group55_group54_group1275_shared0abd8d4}
                >
                  Share
                </Text>
                <View
                  data-layer="4579c1d9-e2be-4f5a-8375-9ab367381e2c"
                  style={styles.x1_group55_group54_group1275_sharefa19656f}
                >
                  <View
                    data-layer="c7417f41-66e5-434f-91bb-42508666555c"
                    style={
                      styles.x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3
                    }
                  >
                    <View
                      data-layer="1f2eccdb-df8e-4b7e-897a-685dd6d3a0bc"
                      style={
                        styles.x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3_group126318e70643
                      }
                    >
                      <Svg
                        data-layer="bd3901db-d4a9-4843-98dc-94694c277ba5"
                        style={
                          styles.x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3_group126318e70643_path23826bcb7ab
                        }
                        preserveAspectRatio="none"
                        viewBox="106.66697692871094 64.0044937133789 15.57122802734375 12.29248046875"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path23826bcb7ab"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path23826bcb7ab.png")}
                              x="0"
                              y="0"
                              width="15.57px"
                              height="12.29px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 122.0951385498047 69.020263671875 L 116.3583068847656 64.10297393798828 C 116.2374572753906 63.99893951416016 116.0670013427734 63.97531127929688 115.9205169677734 64.04174041748047 C 115.7752685546875 64.10858154296875 115.6820220947266 64.25382995605469 115.6820220947266 64.41391754150391 L 115.6820220947266 67.28795623779297 C 111.1032562255859 67.41522979736328 108.8943176269531 69.68174743652344 107.8442840576172 71.59177398681641 C 106.9311065673828 73.25209045410156 106.7262268066406 74.89596557617188 106.6801910400391 75.57066345214844 C 106.6714019775391 75.67392730712891 106.6669769287109 75.77915191650391 106.6669769287109 75.88640594482422 L 106.6669769287109 75.88760375976563 C 106.6669769287109 75.88760375976563 106.6669769287109 75.88798522949219 106.6669769287109 75.88841247558594 L 106.6669769287109 75.8887939453125 C 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 L 106.6669769287109 75.89037322998047 L 106.6669769287109 75.89075469970703 C 106.6669769287109 75.89075469970703 106.6669769287109 75.89113616943359 106.6669769287109 75.89156341552734 L 106.6669769287109 75.89194488525391 C 106.6669769287109 75.89232635498047 106.6669769287109 75.89275360107422 106.6669769287109 75.89275360107422 C 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 L 106.6669769287109 75.89432525634766 C 106.6669769287109 75.89471435546875 106.6669769287109 75.89513397216797 106.6669769287109 75.89551544189453 C 106.6669769287109 75.89551544189453 106.6669769287109 75.89590454101563 106.6669769287109 75.89670562744141 L 106.6669769287109 75.8970947265625 L 106.6669769287109 75.89789581298828 L 106.6669769287109 75.89828491210938 C 106.6669769287109 75.89866638183594 106.6669769287109 75.89909362792969 106.6669769287109 75.89947509765625 L 106.6673736572266 75.90066528320313 C 106.6673736572266 75.90066528320313 106.6673736572266 75.90066528320313 106.6673736572266 75.90104675292969 C 106.6673736572266 75.90185546875 106.6673736572266 75.90224456787109 106.6673736572266 75.90224456787109 C 106.6673736572266 75.90262603759766 106.6673736572266 75.90304565429688 106.6673736572266 75.90343475341797 L 106.6673736572266 75.90462493896484 L 106.6673736572266 75.90581512451172 L 106.6673736572266 75.90619659423828 L 106.6673736572266 75.90738677978516 C 106.6673736572266 75.90777587890625 106.6673736572266 75.908203125 106.6673736572266 75.90857696533203 C 106.6673736572266 75.90857696533203 106.6673736572266 75.90939331054688 106.6677551269531 75.90976715087891 C 106.6677551269531 75.90976715087891 106.6677551269531 75.91016387939453 106.6677551269531 75.91096496582031 L 106.6677551269531 75.91135406494141 C 106.6677551269531 75.91172790527344 106.6677551269531 75.91215515136719 106.6677551269531 75.91254425048828 L 106.6677551269531 75.91373443603516 C 106.6677551269531 75.91411590576172 106.6677551269531 75.91453552246094 106.6677551269531 75.91492462158203 C 106.6673736572266 75.91611480712891 106.6685638427734 75.91653442382813 106.6681365966797 75.91653442382813 L 106.6681365966797 75.917724609375 C 106.6681365966797 75.91811370849609 106.6681365966797 75.91853332519531 106.6681365966797 75.91891479492188 L 106.6681365966797 75.92011260986328 C 106.6681365966797 75.92091369628906 106.6685180664063 75.92172241210938 106.6685180664063 75.92172241210938 L 106.6685180664063 75.92291259765625 C 106.6685180664063 75.92330169677734 106.6685180664063 75.92372131347656 106.6685180664063 75.92410278320313 L 106.6685180664063 75.92449188232422 L 106.6685180664063 75.92529296875 L 106.6685180664063 75.92568206787109 L 106.6688995361328 75.92648315429688 L 106.6688995361328 75.92687225341797 C 106.6688995361328 75.92725372314453 106.6688995361328 75.92767333984375 106.6688995361328 75.92767333984375 C 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 L 106.6688995361328 75.92926025390625 L 106.6688995361328 75.92963409423828 C 106.6692962646484 75.93002319335938 106.6692962646484 75.93002319335938 106.6692962646484 75.93045043945313 C 106.6692962646484 75.93045043945313 106.6692962646484 75.93082427978516 106.6692962646484 75.93125152587891 L 106.6692962646484 75.931640625 C 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 L 106.6692962646484 75.93283081054688 C 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 C 106.669677734375 75.93440246582031 106.669677734375 75.93482971191406 106.669677734375 75.93521118164063 L 106.669677734375 75.93559265136719 L 106.669677734375 75.9364013671875 L 106.669677734375 75.93678283691406 C 106.6700592041016 75.93717193603516 106.6700592041016 75.93759155273438 106.6700592041016 75.93759155273438 C 106.6700592041016 75.93840026855469 106.6700592041016 75.93878173828125 106.6700592041016 75.93878173828125 C 106.6956787109375 76.14085388183594 106.8681335449219 76.29694366455078 107.0766143798828 76.29694366455078 C 107.3027038574219 76.29694366455078 107.4859771728516 76.11408233642578 107.4864044189453 75.88796234130859 L 107.4864044189453 75.8875732421875 C 107.4864044189453 75.86675262451172 107.4867858886719 75.81592559814453 107.4904022216797 75.73832702636719 C 107.6692657470703 72.33087921142578 113.96435546875 71.55774688720703 115.681884765625 71.41007232666016 L 115.681884765625 74.24807739257813 C 115.681884765625 74.40816497802734 115.7751159667969 74.55341339111328 115.9203643798828 74.62026214599609 C 116.0664215087891 74.68667602539063 116.2364959716797 74.66347503662109 116.358154296875 74.55902099609375 L 122.0949859619141 69.64173126220703 C 122.1858367919922 69.56409454345703 122.2382354736328 69.45045471191406 122.2382354736328 69.33078765869141 C 122.2383880615234 69.21154022216797 122.1859588623047 69.097900390625 122.0951385498047 69.020263671875 Z"
                          fill="url(#img-path23826bcb7ab)"
                        />
                      </Svg>
                      <Svg
                        data-layer="0c7094a1-7460-4c70-97b2-029d05b1c350"
                        style={
                          styles.x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3_group126318e70643_path239f3db6587
                        }
                        preserveAspectRatio="none"
                        viewBox="0 149.32899475097656 17.2105712890625 13.8258056640625"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path239f3db6587"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path239f3db6587.png")}
                              x="0"
                              y="0"
                              width="17.21px"
                              height="13.83px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 16.97202491760254 156.490234375 C 16.82596588134766 156.4092254638672 16.65589714050293 156.4376831054688 16.53384780883789 156.5640258789063 L 15.71431255340576 157.4107971191406 C 15.62388038635254 157.5043487548828 15.57144165039063 157.6412658691406 15.57144165039063 157.7854766845703 L 15.57144165039063 161.1797180175781 L 1.639109373092651 161.1797180175781 L 1.639109373092651 151.3040771484375 L 6.218642234802246 151.3040771484375 C 6.317872047424316 151.3040771484375 6.413528442382813 151.2606506347656 6.487941265106201 151.1820983886719 C 6.813673496246338 150.8397216796875 7.165835380554199 150.5224456787109 7.534401893615723 150.2389068603516 C 7.688066959381104 150.1212310791016 7.758484363555908 149.8950958251953 7.707659244537354 149.6843566894531 C 7.656834125518799 149.4736480712891 7.4963698387146 149.3289947509766 7.314275741577148 149.3289947509766 L 1.639109373092651 149.3289947509766 C 0.7350963950157166 149.3289947509766 0 150.2147827148438 0 151.3040771484375 L 0 161.1796264648438 C 0 162.2689208984375 0.7350963950157166 163.1547546386719 1.639109373092651 163.1547546386719 L 15.57144165039063 163.1547546386719 C 16.47541618347168 163.1547546386719 17.21055221557617 162.2689819335938 17.21055221557617 161.1796264648438 L 17.21055221557617 156.9386291503906 C 17.21051406860352 156.7457580566406 17.11727714538574 156.5707397460938 16.97202491760254 156.490234375 Z"
                          fill="url(#img-path239f3db6587)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <View
              data-layer="48786861-ef48-49b8-b5b8-be619a9645c4"
              style={styles.x1_group55_group1276}
            >
              <View
                data-layer="4dbc0e4d-b328-4329-8510-4b77d163b412"
                style={styles.x1_group55_group1276_rectangle1097d19efd}
              ></View>
              <View
                data-layer="cc0a66ce-29d4-413a-9c17-b1d5967ce0cb"
                style={styles.x1_group55_group1276_rectangle115944046f}
              ></View>
              <View
                data-layer="5fbde7fa-cd10-43a5-a438-bddcb61cabfe"
                style={styles.x1_group55_group1276_rectangle1275405080}
              ></View>
              <View
                data-layer="7c2cd34b-a13c-4b97-944b-132df20f2f58"
                style={styles.x1_group55_group1276_rectangle138e5c27cb}
              ></View>
              <Text
                data-layer="789e52c1-375e-417f-aef3-c0372e5a95f0"
                style={styles.x1_group55_group1276_like899dfa8a}
              >
                Like
              </Text>
              <Text
                data-layer="962f5ac6-81ac-4ec1-90d2-7a3f28a4a30e"
                style={styles.x1_group55_group1276_comment6425c8c9}
              >
                Comment
              </Text>
              <View
                data-layer="d0a11bb7-24a0-4fbb-aa7b-4183cabeac27"
                style={styles.x1_group55_group1276_likeb20e2f15}
              >
                <View
                  data-layer="dccbc9c6-f3d4-44ec-a8b4-8586929a494d"
                  style={
                    styles.x1_group55_group1276_likeb20e2f15_group126063cea566
                  }
                >
                  <View
                    data-layer="7f7bc32d-90df-4b7c-97d7-89a2c71741fb"
                    style={
                      styles.x1_group55_group1276_likeb20e2f15_group126063cea566_group12594da0e967
                    }
                  >
                    <Svg
                      data-layer="e5b629ed-a371-4c38-ae53-bb50a92b9d33"
                      style={
                        styles.x1_group55_group1276_likeb20e2f15_group126063cea566_group12594da0e967_path2367a33baec
                      }
                      preserveAspectRatio="none"
                      viewBox="-1.1920928955078125e-7 224 4.5538330078125 8.4571533203125"
                      fill="transparent"
                    >
                      <Defs>
                        <Pattern
                          id="img-path2367a33baec"
                          patternContentUnits="userSpaceOnUse"
                          width="100%"
                          height="100%"
                        >
                          <SvgImage
                            xlinkHref={require("../assets/path2367a33baec.png")}
                            x="0"
                            y="0"
                            width="4.55px"
                            height="8.46px"
                          />
                        </Pattern>
                      </Defs>
                      <SvgPath
                        d="M 1.626360058784485 224 C 0.7299149632453918 224 0 224.7299194335938 0 225.6263732910156 L 0 230.8307647705078 C 0 231.7272033691406 0.7299149632453918 232.4571228027344 1.626360058784485 232.4571228027344 L 3.578004360198975 232.4571228027344 C 3.944272756576538 232.4571228027344 4.28123664855957 232.3335266113281 4.553826808929443 232.1279296875 L 4.553826808929443 224 L 1.626360058784485 224 Z"
                        fill="url(#img-path2367a33baec)"
                      />
                    </Svg>
                  </View>
                </View>
                <View
                  data-layer="75b9de10-4bd8-4f8b-9493-2997d4b8e7be"
                  style={
                    styles.x1_group55_group1276_likeb20e2f15_group1262aa8897ef
                  }
                >
                  <View
                    data-layer="75039926-5ba8-49e0-841d-540395647106"
                    style={
                      styles.x1_group55_group1276_likeb20e2f15_group1262aa8897ef_group12610e3ce04b
                    }
                  >
                    <Svg
                      data-layer="afa24e87-f572-4bcf-9d81-fd1c05954815"
                      style={
                        styles.x1_group55_group1276_likeb20e2f15_group1262aa8897ef_group12610e3ce04b_path237ccd82887
                      }
                      preserveAspectRatio="none"
                      viewBox="170.6669921875 10.666976928710938 10.40875244140625 14.31201171875"
                      fill="transparent"
                    >
                      <Defs>
                        <Pattern
                          id="img-path237ccd82887"
                          patternContentUnits="userSpaceOnUse"
                          width="100%"
                          height="100%"
                        >
                          <SvgImage
                            xlinkHref={require("../assets/path237ccd82887.png")}
                            x="0"
                            y="0"
                            width="10.41px"
                            height="14.31px"
                          />
                        </Pattern>
                      </Defs>
                      <SvgPath
                        d="M 181.0757446289063 19.61200332641602 C 181.0757446289063 19.22103500366211 180.9209289550781 18.85671615600586 180.6522369384766 18.58803176879883 C 180.9560546875 18.25561141967773 181.1108703613281 17.80996513366699 181.0685729980469 17.34614372253418 C 180.9924621582031 16.519287109375 180.2475738525391 15.87134170532227 179.3719635009766 15.87134170532227 L 175.353515625 15.87134170532227 C 175.5525970458984 15.26697158813477 175.8713531494141 14.15910911560059 175.8713531494141 13.2691593170166 C 175.8713531494141 11.85811996459961 174.6723937988281 10.66697692871094 173.9197082519531 10.66697692871094 C 173.2437896728516 10.66697692871094 172.7610626220703 11.04754829406738 172.7402648925781 11.06316089630127 C 172.6635131835938 11.12497329711914 172.6186218261719 11.21865272521973 172.6186218261719 11.31751537322998 L 172.6186218261719 13.52351379394531 L 170.7450561523438 17.5822925567627 L 170.6669921875 17.62196731567383 L 170.6669921875 24.59455108642578 C 171.1965179443359 24.84436225891113 171.8665771484375 24.97902679443359 172.2933502197266 24.97902679443359 L 178.2647399902344 24.97902679443359 C 178.9731750488281 24.97902679443359 179.5931701660156 24.50151252746582 179.7388610839844 23.84252738952637 C 179.8136749267578 23.50358200073242 179.7700958251953 23.16204452514648 179.6211242675781 22.86539459228516 C 180.1018676757813 22.62339019775391 180.4252014160156 22.1283130645752 180.4252014160156 21.56364822387695 C 180.4252014160156 21.33335494995117 180.3725128173828 21.11281967163086 180.2723388671875 20.91310882568359 C 180.7530822753906 20.67110443115234 181.0757446289063 20.17602920532227 181.0757446289063 19.61200332641602 Z"
                        fill="url(#img-path237ccd82887)"
                      />
                    </Svg>
                  </View>
                </View>
              </View>
              <View
                data-layer="775517e7-b57c-40d0-bd24-a91246d6231b"
                style={
                  styles.x1_group55_group1276_chatBubblesWithEllipsis13d0868e9
                }
              >
                <Svg
                  data-layer="7af7f83f-cfbc-489c-bf89-caa9ee7cd647"
                  style={
                    styles.x1_group55_group1276_chatBubblesWithEllipsis13d0868e9_path227b5566649
                  }
                  preserveAspectRatio="none"
                  viewBox="0 3.239999532699585 17.67047119140625 14.179931640625"
                  fill="transparent"
                >
                  <Defs>
                    <Pattern
                      id="img-path227b5566649"
                      patternContentUnits="userSpaceOnUse"
                      width="100%"
                      height="100%"
                    >
                      <SvgImage
                        xlinkHref={require("../assets/path227b5566649.png")}
                        x="0"
                        y="0"
                        width="17.67px"
                        height="14.18px"
                      />
                    </Pattern>
                  </Defs>
                  <SvgPath
                    d="M 15.46981716156006 3.239999532699585 L 2.461630821228027 3.239999532699585 C 1.317129135131836 3.239999532699585 0 4.256734371185303 0 5.236770153045654 L 0 13.12055110931396 C 0 14.02310657501221 1.115957260131836 14.67487812042236 2.186380386352539 14.77546501159668 L 1.489755630493164 17.41993141174316 L 5.953588485717773 14.79381370544434 L 15.46981906890869 14.79381370544434 C 16.61432075500488 14.79381370544434 17.67047119140625 14.0999059677124 17.67047119140625 13.12055110931396 L 17.67047119140625 6.742164611816406 L 17.67047119140625 5.236770153045654 C 17.67047119140625 4.256734371185303 16.61363983154297 3.239999532699585 15.46981716156006 3.239999532699585 Z M 4.446160316467285 9.894996643066406 C 3.797110557556152 9.894996643066406 3.271075248718262 9.368959426879883 3.271075248718262 8.719905853271484 C 3.271075248718262 8.070853233337402 3.797110557556152 7.544815540313721 4.446160316467285 7.544815540313721 C 5.09453296661377 7.544815540313721 5.621248245239258 8.070853233337402 5.621248245239258 8.719905853271484 C 5.621248245239258 9.368959426879883 5.09453296661377 9.894996643066406 4.446160316467285 9.894996643066406 Z M 8.835235595703125 9.894996643066406 C 8.186184883117676 9.894996643066406 7.660148620605469 9.368959426879883 7.660148620605469 8.719905853271484 C 7.660148620605469 8.070853233337402 8.186184883117676 7.544815540313721 8.835235595703125 7.544815540313721 C 9.484284400939941 7.544815540313721 10.01032161712646 8.070853233337402 10.01032161712646 8.719905853271484 C 10.01032161712646 9.368959426879883 9.484284400939941 9.894996643066406 8.835235595703125 9.894996643066406 Z M 13.22498798370361 9.894996643066406 C 12.57593822479248 9.894996643066406 12.04922294616699 9.368959426879883 12.04922294616699 8.719905853271484 C 12.04922294616699 8.070853233337402 12.57593822479248 7.544815540313721 13.22498798370361 7.544815540313721 C 13.87267875671387 7.544815540313721 14.40007400512695 8.070853233337402 14.40007400512695 8.719905853271484 C 14.40007400512695 9.368959426879883 13.87267971038818 9.894996643066406 13.22498798370361 9.894996643066406 Z"
                    fill="url(#img-path227b5566649)"
                  />
                </Svg>
              </View>
              <Text
                data-layer="2ad36d3b-d060-44db-a45c-1068d8738928"
                style={styles.x1_group55_group1276_bookmarkf6fb7c57}
              >
                Bookmark
              </Text>
              <View
                data-layer="c94a36a0-2769-4caa-bd0c-406118238c07"
                style={styles.x1_group55_group1276_bookmark6a2c4a05}
              >
                <View
                  data-layer="227928e0-9f7c-46ad-b492-0fae09c1bf7e"
                  style={
                    styles.x1_group55_group1276_bookmark6a2c4a05_group1227933b6d19
                  }
                >
                  <Svg
                    data-layer="6e3e1e2c-72ad-46e7-891c-2d95a3e7a189"
                    style={
                      styles.x1_group55_group1276_bookmark6a2c4a05_group1227933b6d19_path216986a7b3a
                    }
                    preserveAspectRatio="none"
                    viewBox="105.91800689697266 -0.75 11.12701416015625 16.525634765625"
                    fill="transparent"
                  >
                    <SvgPath d="M 114.919792175293 0 L 108.0433120727539 0 C 107.2851486206055 0 106.6680068969727 0.5615495443344116 106.6680068969727 1.252136588096619 L 106.6680068969727 14.71250915527344 C 106.6680068969727 14.83174419403076 106.7425689697266 14.9405632019043 106.8600540161133 14.99344539642334 C 106.9789276123047 15.04603576660156 107.117919921875 15.03350257873535 107.2213287353516 14.96072387695313 L 111.4815444946289 11.97712993621826 L 115.7417526245117 14.96072387695313 C 115.8028717041016 15.00351238250732 115.8767395019531 15.02552127838135 115.9512710571289 15.02552127838135 C 116.0029830932617 15.02552127838135 116.0546798706055 15.01480960845947 116.10302734375 14.99341583251953 C 116.2205581665039 14.94053363800049 116.2950744628906 14.83171653747559 116.2950744628906 14.71248054504395 L 116.2950744628906 1.252136588096619 C 116.2951049804688 0.5615495443344116 115.6779632568359 0 114.919792175293 0 Z" />
                  </Svg>
                </View>
              </View>
              <Text
                data-layer="e54ebe76-2a11-4fa2-944d-3f75a837cc09"
                style={styles.x1_group55_group1276_share13f91bd2}
              >
                Share
              </Text>
              <View
                data-layer="7f83c3c2-6351-4a28-b0a4-eef86e35f2c3"
                style={styles.x1_group55_group1276_share85948cf1}
              >
                <View
                  data-layer="6b500b62-5e11-4acd-96a9-b353e169268a"
                  style={
                    styles.x1_group55_group1276_share85948cf1_group126400c74766
                  }
                >
                  <View
                    data-layer="2653227b-77bb-4d5f-875b-218b5caa7796"
                    style={
                      styles.x1_group55_group1276_share85948cf1_group126400c74766_group12633af3df23
                    }
                  >
                    <Svg
                      data-layer="fef160c7-6d4f-4b45-8feb-c2453274216e"
                      style={
                        styles.x1_group55_group1276_share85948cf1_group126400c74766_group12633af3df23_path2385c2774f6
                      }
                      preserveAspectRatio="none"
                      viewBox="106.66697692871094 64.0044937133789 15.57122802734375 12.29248046875"
                      fill="transparent"
                    >
                      <Defs>
                        <Pattern
                          id="img-path2385c2774f6"
                          patternContentUnits="userSpaceOnUse"
                          width="100%"
                          height="100%"
                        >
                          <SvgImage
                            xlinkHref={require("../assets/path2385c2774f6.png")}
                            x="0"
                            y="0"
                            width="15.57px"
                            height="12.29px"
                          />
                        </Pattern>
                      </Defs>
                      <SvgPath
                        d="M 122.0951385498047 69.020263671875 L 116.3583068847656 64.10297393798828 C 116.2374572753906 63.99893951416016 116.0670013427734 63.97531127929688 115.9205169677734 64.04174041748047 C 115.7752685546875 64.10858154296875 115.6820220947266 64.25382995605469 115.6820220947266 64.41391754150391 L 115.6820220947266 67.28795623779297 C 111.1032562255859 67.41522979736328 108.8943176269531 69.68174743652344 107.8442840576172 71.59177398681641 C 106.9311065673828 73.25209045410156 106.7262268066406 74.89596557617188 106.6801910400391 75.57066345214844 C 106.6714019775391 75.67392730712891 106.6669769287109 75.77915191650391 106.6669769287109 75.88640594482422 L 106.6669769287109 75.88760375976563 C 106.6669769287109 75.88760375976563 106.6669769287109 75.88798522949219 106.6669769287109 75.88841247558594 L 106.6669769287109 75.8887939453125 C 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 L 106.6669769287109 75.89037322998047 L 106.6669769287109 75.89075469970703 C 106.6669769287109 75.89075469970703 106.6669769287109 75.89113616943359 106.6669769287109 75.89156341552734 L 106.6669769287109 75.89194488525391 C 106.6669769287109 75.89232635498047 106.6669769287109 75.89275360107422 106.6669769287109 75.89275360107422 C 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 L 106.6669769287109 75.89432525634766 C 106.6669769287109 75.89471435546875 106.6669769287109 75.89513397216797 106.6669769287109 75.89551544189453 C 106.6669769287109 75.89551544189453 106.6669769287109 75.89590454101563 106.6669769287109 75.89670562744141 L 106.6669769287109 75.8970947265625 L 106.6669769287109 75.89789581298828 L 106.6669769287109 75.89828491210938 C 106.6669769287109 75.89866638183594 106.6669769287109 75.89909362792969 106.6669769287109 75.89947509765625 L 106.6673736572266 75.90066528320313 C 106.6673736572266 75.90066528320313 106.6673736572266 75.90066528320313 106.6673736572266 75.90104675292969 C 106.6673736572266 75.90185546875 106.6673736572266 75.90224456787109 106.6673736572266 75.90224456787109 C 106.6673736572266 75.90262603759766 106.6673736572266 75.90304565429688 106.6673736572266 75.90343475341797 L 106.6673736572266 75.90462493896484 L 106.6673736572266 75.90581512451172 L 106.6673736572266 75.90619659423828 L 106.6673736572266 75.90738677978516 C 106.6673736572266 75.90777587890625 106.6673736572266 75.908203125 106.6673736572266 75.90857696533203 C 106.6673736572266 75.90857696533203 106.6673736572266 75.90939331054688 106.6677551269531 75.90976715087891 C 106.6677551269531 75.90976715087891 106.6677551269531 75.91016387939453 106.6677551269531 75.91096496582031 L 106.6677551269531 75.91135406494141 C 106.6677551269531 75.91172790527344 106.6677551269531 75.91215515136719 106.6677551269531 75.91254425048828 L 106.6677551269531 75.91373443603516 C 106.6677551269531 75.91411590576172 106.6677551269531 75.91453552246094 106.6677551269531 75.91492462158203 C 106.6673736572266 75.91611480712891 106.6685638427734 75.91653442382813 106.6681365966797 75.91653442382813 L 106.6681365966797 75.917724609375 C 106.6681365966797 75.91811370849609 106.6681365966797 75.91853332519531 106.6681365966797 75.91891479492188 L 106.6681365966797 75.92011260986328 C 106.6681365966797 75.92091369628906 106.6685180664063 75.92172241210938 106.6685180664063 75.92172241210938 L 106.6685180664063 75.92291259765625 C 106.6685180664063 75.92330169677734 106.6685180664063 75.92372131347656 106.6685180664063 75.92410278320313 L 106.6685180664063 75.92449188232422 L 106.6685180664063 75.92529296875 L 106.6685180664063 75.92568206787109 L 106.6688995361328 75.92648315429688 L 106.6688995361328 75.92687225341797 C 106.6688995361328 75.92725372314453 106.6688995361328 75.92767333984375 106.6688995361328 75.92767333984375 C 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 L 106.6688995361328 75.92926025390625 L 106.6688995361328 75.92963409423828 C 106.6692962646484 75.93002319335938 106.6692962646484 75.93002319335938 106.6692962646484 75.93045043945313 C 106.6692962646484 75.93045043945313 106.6692962646484 75.93082427978516 106.6692962646484 75.93125152587891 L 106.6692962646484 75.931640625 C 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 L 106.6692962646484 75.93283081054688 C 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 C 106.669677734375 75.93440246582031 106.669677734375 75.93482971191406 106.669677734375 75.93521118164063 L 106.669677734375 75.93559265136719 L 106.669677734375 75.9364013671875 L 106.669677734375 75.93678283691406 C 106.6700592041016 75.93717193603516 106.6700592041016 75.93759155273438 106.6700592041016 75.93759155273438 C 106.6700592041016 75.93840026855469 106.6700592041016 75.93878173828125 106.6700592041016 75.93878173828125 C 106.6956787109375 76.14085388183594 106.8681335449219 76.29694366455078 107.0766143798828 76.29694366455078 C 107.3027038574219 76.29694366455078 107.4859771728516 76.11408233642578 107.4864044189453 75.88796234130859 L 107.4864044189453 75.8875732421875 C 107.4864044189453 75.86675262451172 107.4867858886719 75.81592559814453 107.4904022216797 75.73832702636719 C 107.6692657470703 72.33087921142578 113.96435546875 71.55774688720703 115.681884765625 71.41007232666016 L 115.681884765625 74.24807739257813 C 115.681884765625 74.40816497802734 115.7751159667969 74.55341339111328 115.9203643798828 74.62026214599609 C 116.0664215087891 74.68667602539063 116.2364959716797 74.66347503662109 116.358154296875 74.55902099609375 L 122.0949859619141 69.64173126220703 C 122.1858367919922 69.56409454345703 122.2382354736328 69.45045471191406 122.2382354736328 69.33078765869141 C 122.2383880615234 69.21154022216797 122.1859588623047 69.097900390625 122.0951385498047 69.020263671875 Z"
                        fill="url(#img-path2385c2774f6)"
                      />
                    </Svg>
                    <Svg
                      data-layer="c4e4eb5d-fee6-4c94-80c9-b5cc382f15de"
                      style={
                        styles.x1_group55_group1276_share85948cf1_group126400c74766_group12633af3df23_path23909b99ab1
                      }
                      preserveAspectRatio="none"
                      viewBox="0 149.32899475097656 17.2105712890625 13.8258056640625"
                      fill="transparent"
                    >
                      <Defs>
                        <Pattern
                          id="img-path23909b99ab1"
                          patternContentUnits="userSpaceOnUse"
                          width="100%"
                          height="100%"
                        >
                          <SvgImage
                            xlinkHref={require("../assets/path23909b99ab1.png")}
                            x="0"
                            y="0"
                            width="17.21px"
                            height="13.83px"
                          />
                        </Pattern>
                      </Defs>
                      <SvgPath
                        d="M 16.97202491760254 156.490234375 C 16.82596588134766 156.4092254638672 16.65589714050293 156.4376831054688 16.53384780883789 156.5640258789063 L 15.71431255340576 157.4107971191406 C 15.62388038635254 157.5043487548828 15.57144165039063 157.6412658691406 15.57144165039063 157.7854766845703 L 15.57144165039063 161.1797180175781 L 1.639109373092651 161.1797180175781 L 1.639109373092651 151.3040771484375 L 6.218642234802246 151.3040771484375 C 6.317872047424316 151.3040771484375 6.413528442382813 151.2606506347656 6.487941265106201 151.1820983886719 C 6.813673496246338 150.8397216796875 7.165835380554199 150.5224456787109 7.534401893615723 150.2389068603516 C 7.688066959381104 150.1212310791016 7.758484363555908 149.8950958251953 7.707659244537354 149.6843566894531 C 7.656834125518799 149.4736480712891 7.4963698387146 149.3289947509766 7.314275741577148 149.3289947509766 L 1.639109373092651 149.3289947509766 C 0.7350963950157166 149.3289947509766 0 150.2147827148438 0 151.3040771484375 L 0 161.1796264648438 C 0 162.2689208984375 0.7350963950157166 163.1547546386719 1.639109373092651 163.1547546386719 L 15.57144165039063 163.1547546386719 C 16.47541618347168 163.1547546386719 17.21055221557617 162.2689819335938 17.21055221557617 161.1796264648438 L 17.21055221557617 156.9386291503906 C 17.21051406860352 156.7457580566406 17.11727714538574 156.5707397460938 16.97202491760254 156.490234375 Z"
                        fill="url(#img-path23909b99ab1)"
                      />
                    </Svg>
                  </View>
                </View>
              </View>
            </View>
            <View
              data-layer="30b24a2e-5724-4378-96ef-c07c2bfdc096"
              style={styles.x1_group55_group1279}
            >
              <View
                data-layer="e09e82a6-6769-41e8-b829-5fb9f2adc1d5"
                style={styles.x1_group55_group1279_rectangle9ec46ea1c}
              ></View>
              <Svg
                data-layer="ed7c301a-4cc0-4d9a-82bf-d201f9b74c92"
                style={styles.x1_group55_group1279_line2}
                preserveAspectRatio="none"
                viewBox="0 -0.5 357 1"
                fill="transparent"
              >
                <SvgPath d="M 0 0 L 357 0" />
              </Svg>
              <ReactImage
                data-layer="18bdf7a8-ab42-4fde-8ef7-f0358572591b"
                source={require("../assets/badBoysForLife5120x5120WillSmithMartinLawrence4k5k202019468.png")}
                style={
                  styles.x1_group55_group1279_badBoysForLife5120x5120WillSmithMartinLawrence4k5k202019468
                }
              />
              <View
                data-layer="b9b177c9-d42e-4a7d-8fc4-cac4829e2f52"
                style={styles.x1_group55_group1279_group27}
              >
                <Text
                  data-layer="b297921f-8d0d-41ef-bc97-aff52038de88"
                  style={styles.x1_group55_group1279_group27_cirquipNews}
                >
                  CirQuip News
                </Text>
                <Svg
                  data-layer="7135eef2-242f-42bd-9efa-791c712f241a"
                  style={styles.x1_group55_group1279_group27_ellipse17e94f80b}
                  preserveAspectRatio="none"
                  viewBox="0 0 45 44"
                  fill="rgba(255, 255, 255, 0)"
                >
                  <Defs>
                    <Pattern
                      id="img-ellipse17e94f80b"
                      patternContentUnits="userSpaceOnUse"
                      width="100%"
                      height="100%"
                    >
                      <SvgImage
                        xlinkHref={require("../assets/ellipse17e94f80b.png")}
                        x="0"
                        y="0"
                        width="45.00px"
                        height="44.00px"
                      />
                    </Pattern>
                  </Defs>
                  <SvgPath
                    d="M 22.5 0 C 34.92640686035156 0 45 9.849736213684082 45 22 C 45 34.15026473999023 34.92640686035156 44 22.5 44 C 10.07359409332275 44 0 34.15026473999023 0 22 C 0 9.849736213684082 10.07359409332275 0 22.5 0 Z"
                    fill="url(#img-ellipse17e94f80b)"
                  />
                </Svg>
              </View>
              <Text
                data-layer="88b41fda-defe-4292-bb1d-e5f35c1043c6"
                style={
                  styles.x1_group55_group1279_theProductionDeptBuildingWhichWasInFormationForLast5YearsIsFinallyCompletedhereIsSomeHistoryOfThatBuildingseeMore
                }
              >
                The Production Dept. building which was in formation for last 5
                years is finally completed. Here is some history of that
                building....see more
              </Text>
              <View
                data-layer="406e8cfc-6ce2-46b8-a892-316df00884b4"
                style={styles.x1_group55_group1279_group1251}
              >
                <View
                  data-layer="891f4a35-996f-489f-a58f-8ecd42e07194"
                  style={styles.x1_group55_group1279_group1251_rectangle352}
                ></View>
                <Text
                  data-layer="05c47804-f52f-433d-8df6-aead7a6fa73e"
                  style={styles.x1_group55_group1279_group1251_x38Comments}
                >
                  38 comments
                </Text>
              </View>
              <View
                data-layer="cc4beb56-28dd-4ecd-9f5c-fcd390dd0041"
                style={styles.x1_group55_group1279_group1277}
              >
                <View
                  data-layer="8f01b98e-5abe-469c-94c8-88756ddc03e4"
                  style={
                    styles.x1_group55_group1279_group1277_rectangle10f59e50c3
                  }
                ></View>
                <View
                  data-layer="d39b0950-101d-4a59-82aa-607a4708b740"
                  style={styles.x1_group55_group1279_group1277_rectangle11}
                ></View>
                <View
                  data-layer="3772db67-4168-4d44-a53a-f81f5d5613e3"
                  style={styles.x1_group55_group1279_group1277_rectangle12}
                ></View>
                <View
                  data-layer="00f4ccc3-4b44-4836-9a18-811c112f69d0"
                  style={styles.x1_group55_group1279_group1277_rectangle13}
                ></View>
                <Text
                  data-layer="26de83dc-0459-4f04-9f6e-3f51eba02547"
                  style={styles.x1_group55_group1279_group1277_like6be4fd18}
                >
                  Like
                </Text>
                <Text
                  data-layer="5ab1cafe-52a4-4ba7-a50a-422238996a46"
                  style={styles.x1_group55_group1279_group1277_comment}
                >
                  Comment
                </Text>
                <View
                  data-layer="6ac1a274-fe3c-4e21-bce9-6ac6de21d126"
                  style={styles.x1_group55_group1279_group1277_like}
                >
                  <View
                    data-layer="5cb1c994-fd5e-4dc0-989a-d7a73ae65b53"
                    style={styles.x1_group55_group1279_group1277_like_group1260}
                  >
                    <View
                      data-layer="a47129ad-42b6-4496-bab8-e637f48004e1"
                      style={
                        styles.x1_group55_group1279_group1277_like_group1260_group1259
                      }
                    >
                      <Svg
                        data-layer="fe759019-1f53-47cc-943b-92dbba1ad274"
                        style={
                          styles.x1_group55_group1279_group1277_like_group1260_group1259_path236
                        }
                        preserveAspectRatio="none"
                        viewBox="-1.1920928955078125e-7 224 4.5538330078125 8.45703125"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path236"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path236.png")}
                              x="0"
                              y="0"
                              width="4.55px"
                              height="8.46px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 1.626360058784485 224 C 0.7299149632453918 224 0 224.7299194335938 0 225.6263732910156 L 0 230.8307647705078 C 0 231.7272033691406 0.7299149632453918 232.4571228027344 1.626360058784485 232.4571228027344 L 3.578004360198975 232.4571228027344 C 3.944272756576538 232.4571228027344 4.28123664855957 232.3335266113281 4.553826808929443 232.1279296875 L 4.553826808929443 224 L 1.626360058784485 224 Z"
                          fill="url(#img-path236)"
                        />
                      </Svg>
                    </View>
                  </View>
                  <View
                    data-layer="fc458afb-efbc-4c38-83ca-09ffa2ffc63d"
                    style={styles.x1_group55_group1279_group1277_like_group1262}
                  >
                    <View
                      data-layer="10883b14-1cad-4b8b-b43c-17b689aec1da"
                      style={
                        styles.x1_group55_group1279_group1277_like_group1262_group1261
                      }
                    >
                      <Svg
                        data-layer="2b90905c-9f02-4b59-9506-6ad8b9c8d499"
                        style={
                          styles.x1_group55_group1279_group1277_like_group1262_group1261_path237
                        }
                        preserveAspectRatio="none"
                        viewBox="170.6669921875 10.666976928710938 10.40875244140625 14.31201171875"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path237"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path237.png")}
                              x="0"
                              y="0"
                              width="10.41px"
                              height="14.31px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 181.0757446289063 19.61200332641602 C 181.0757446289063 19.22103500366211 180.9209289550781 18.85671615600586 180.6522369384766 18.58803176879883 C 180.9560546875 18.25561141967773 181.1108703613281 17.80996513366699 181.0685729980469 17.34614372253418 C 180.9924621582031 16.519287109375 180.2475738525391 15.87134170532227 179.3719635009766 15.87134170532227 L 175.353515625 15.87134170532227 C 175.5525970458984 15.26697158813477 175.8713531494141 14.15910911560059 175.8713531494141 13.2691593170166 C 175.8713531494141 11.85811996459961 174.6723937988281 10.66697692871094 173.9197082519531 10.66697692871094 C 173.2437896728516 10.66697692871094 172.7610626220703 11.04754829406738 172.7402648925781 11.06316089630127 C 172.6635131835938 11.12497329711914 172.6186218261719 11.21865272521973 172.6186218261719 11.31751537322998 L 172.6186218261719 13.52351379394531 L 170.7450561523438 17.5822925567627 L 170.6669921875 17.62196731567383 L 170.6669921875 24.59455108642578 C 171.1965179443359 24.84436225891113 171.8665771484375 24.97902679443359 172.2933502197266 24.97902679443359 L 178.2647399902344 24.97902679443359 C 178.9731750488281 24.97902679443359 179.5931701660156 24.50151252746582 179.7388610839844 23.84252738952637 C 179.8136749267578 23.50358200073242 179.7700958251953 23.16204452514648 179.6211242675781 22.86539459228516 C 180.1018676757813 22.62339019775391 180.4252014160156 22.1283130645752 180.4252014160156 21.56364822387695 C 180.4252014160156 21.33335494995117 180.3725128173828 21.11281967163086 180.2723388671875 20.91310882568359 C 180.7530822753906 20.67110443115234 181.0757446289063 20.17602920532227 181.0757446289063 19.61200332641602 Z"
                          fill="url(#img-path237)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
                <View
                  data-layer="de32ef80-4c28-498e-b4bf-8f398e3ea964"
                  style={
                    styles.x1_group55_group1279_group1277_chatBubblesWithEllipsis1e8f9a8c7
                  }
                >
                  <Svg
                    data-layer="17bed556-d998-4722-8e28-91af81d58ce3"
                    style={
                      styles.x1_group55_group1279_group1277_chatBubblesWithEllipsis1e8f9a8c7_path22791adc97a
                    }
                    preserveAspectRatio="none"
                    viewBox="0 3.239999532699585 17.67047119140625 14.179931640625"
                    fill="transparent"
                  >
                    <Defs>
                      <Pattern
                        id="img-path22791adc97a"
                        patternContentUnits="userSpaceOnUse"
                        width="100%"
                        height="100%"
                      >
                        <SvgImage
                          xlinkHref={require("../assets/path22791adc97a.png")}
                          x="0"
                          y="0"
                          width="17.67px"
                          height="14.18px"
                        />
                      </Pattern>
                    </Defs>
                    <SvgPath
                      d="M 15.46981716156006 3.239999532699585 L 2.461630821228027 3.239999532699585 C 1.317129135131836 3.239999532699585 0 4.256734371185303 0 5.236770153045654 L 0 13.12055110931396 C 0 14.02310657501221 1.115957260131836 14.67487812042236 2.186380386352539 14.77546501159668 L 1.489755630493164 17.41993141174316 L 5.953588485717773 14.79381370544434 L 15.46981906890869 14.79381370544434 C 16.61432075500488 14.79381370544434 17.67047119140625 14.0999059677124 17.67047119140625 13.12055110931396 L 17.67047119140625 6.742164611816406 L 17.67047119140625 5.236770153045654 C 17.67047119140625 4.256734371185303 16.61363983154297 3.239999532699585 15.46981716156006 3.239999532699585 Z M 4.446160316467285 9.894996643066406 C 3.797110557556152 9.894996643066406 3.271075248718262 9.368959426879883 3.271075248718262 8.719905853271484 C 3.271075248718262 8.070853233337402 3.797110557556152 7.544815540313721 4.446160316467285 7.544815540313721 C 5.09453296661377 7.544815540313721 5.621248245239258 8.070853233337402 5.621248245239258 8.719905853271484 C 5.621248245239258 9.368959426879883 5.09453296661377 9.894996643066406 4.446160316467285 9.894996643066406 Z M 8.835235595703125 9.894996643066406 C 8.186184883117676 9.894996643066406 7.660148620605469 9.368959426879883 7.660148620605469 8.719905853271484 C 7.660148620605469 8.070853233337402 8.186184883117676 7.544815540313721 8.835235595703125 7.544815540313721 C 9.484284400939941 7.544815540313721 10.01032161712646 8.070853233337402 10.01032161712646 8.719905853271484 C 10.01032161712646 9.368959426879883 9.484284400939941 9.894996643066406 8.835235595703125 9.894996643066406 Z M 13.22498798370361 9.894996643066406 C 12.57593822479248 9.894996643066406 12.04922294616699 9.368959426879883 12.04922294616699 8.719905853271484 C 12.04922294616699 8.070853233337402 12.57593822479248 7.544815540313721 13.22498798370361 7.544815540313721 C 13.87267875671387 7.544815540313721 14.40007400512695 8.070853233337402 14.40007400512695 8.719905853271484 C 14.40007400512695 9.368959426879883 13.87267971038818 9.894996643066406 13.22498798370361 9.894996643066406 Z"
                      fill="url(#img-path22791adc97a)"
                    />
                  </Svg>
                </View>
                <Text
                  data-layer="9a9cf4b1-ad43-48d4-8540-88e95ee20515"
                  style={styles.x1_group55_group1279_group1277_bookmark155ff2ce}
                >
                  Bookmark
                </Text>
                <View
                  data-layer="df397705-9c38-49ec-a4b9-fb50f0729af0"
                  style={styles.x1_group55_group1279_group1277_bookmark}
                >
                  <View
                    data-layer="14bbd686-b8c0-41db-bc26-1e4330182b87"
                    style={
                      styles.x1_group55_group1279_group1277_bookmark_group1227
                    }
                  >
                    <Svg
                      data-layer="d09c2c04-3100-4742-8d34-8ad1b2e31541"
                      style={
                        styles.x1_group55_group1279_group1277_bookmark_group1227_path216
                      }
                      preserveAspectRatio="none"
                      viewBox="105.91800689697266 -0.75 11.12701416015625 16.525634765625"
                      fill="transparent"
                    >
                      <SvgPath d="M 114.919792175293 0 L 108.0433120727539 0 C 107.2851486206055 0 106.6680068969727 0.5615495443344116 106.6680068969727 1.252136588096619 L 106.6680068969727 14.71250915527344 C 106.6680068969727 14.83174419403076 106.7425689697266 14.9405632019043 106.8600540161133 14.99344539642334 C 106.9789276123047 15.04603576660156 107.117919921875 15.03350257873535 107.2213287353516 14.96072387695313 L 111.4815444946289 11.97712993621826 L 115.7417526245117 14.96072387695313 C 115.8028717041016 15.00351238250732 115.8767395019531 15.02552127838135 115.9512710571289 15.02552127838135 C 116.0029830932617 15.02552127838135 116.0546798706055 15.01480960845947 116.10302734375 14.99341583251953 C 116.2205581665039 14.94053363800049 116.2950744628906 14.83171653747559 116.2950744628906 14.71248054504395 L 116.2950744628906 1.252136588096619 C 116.2951049804688 0.5615495443344116 115.6779632568359 0 114.919792175293 0 Z" />
                    </Svg>
                  </View>
                </View>
                <Text
                  data-layer="142cdb91-0e11-4e7a-b9dd-c3a17e0640cb"
                  style={styles.x1_group55_group1279_group1277_sharec3c1f81f}
                >
                  Share
                </Text>
                <View
                  data-layer="be9069c3-a04b-4461-a32a-1d5c18f756c7"
                  style={styles.x1_group55_group1279_group1277_share}
                >
                  <View
                    data-layer="423c8575-28c2-40af-b3ce-0b8cae3d1ed9"
                    style={
                      styles.x1_group55_group1279_group1277_share_group1264
                    }
                  >
                    <View
                      data-layer="ecd6a9d3-559d-4fab-96c4-f4b647cdfe1b"
                      style={
                        styles.x1_group55_group1279_group1277_share_group1264_group1263
                      }
                    >
                      <Svg
                        data-layer="3db1792b-c0e1-49fa-8df3-4f4627b553eb"
                        style={
                          styles.x1_group55_group1279_group1277_share_group1264_group1263_path238
                        }
                        preserveAspectRatio="none"
                        viewBox="106.66697692871094 64.0044937133789 15.57122802734375 12.29248046875"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path238"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path238.png")}
                              x="0"
                              y="0"
                              width="15.57px"
                              height="12.29px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 122.0951385498047 69.020263671875 L 116.3583068847656 64.10297393798828 C 116.2374572753906 63.99893951416016 116.0670013427734 63.97531127929688 115.9205169677734 64.04174041748047 C 115.7752685546875 64.10858154296875 115.6820220947266 64.25382995605469 115.6820220947266 64.41391754150391 L 115.6820220947266 67.28795623779297 C 111.1032562255859 67.41522979736328 108.8943176269531 69.68174743652344 107.8442840576172 71.59177398681641 C 106.9311065673828 73.25209045410156 106.7262268066406 74.89596557617188 106.6801910400391 75.57066345214844 C 106.6714019775391 75.67392730712891 106.6669769287109 75.77915191650391 106.6669769287109 75.88640594482422 L 106.6669769287109 75.88760375976563 C 106.6669769287109 75.88760375976563 106.6669769287109 75.88798522949219 106.6669769287109 75.88841247558594 L 106.6669769287109 75.8887939453125 C 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 106.6669769287109 75.88917541503906 L 106.6669769287109 75.89037322998047 L 106.6669769287109 75.89075469970703 C 106.6669769287109 75.89075469970703 106.6669769287109 75.89113616943359 106.6669769287109 75.89156341552734 L 106.6669769287109 75.89194488525391 C 106.6669769287109 75.89232635498047 106.6669769287109 75.89275360107422 106.6669769287109 75.89275360107422 C 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 106.6669769287109 75.89313507080078 L 106.6669769287109 75.89432525634766 C 106.6669769287109 75.89471435546875 106.6669769287109 75.89513397216797 106.6669769287109 75.89551544189453 C 106.6669769287109 75.89551544189453 106.6669769287109 75.89590454101563 106.6669769287109 75.89670562744141 L 106.6669769287109 75.8970947265625 L 106.6669769287109 75.89789581298828 L 106.6669769287109 75.89828491210938 C 106.6669769287109 75.89866638183594 106.6669769287109 75.89909362792969 106.6669769287109 75.89947509765625 L 106.6673736572266 75.90066528320313 C 106.6673736572266 75.90066528320313 106.6673736572266 75.90066528320313 106.6673736572266 75.90104675292969 C 106.6673736572266 75.90185546875 106.6673736572266 75.90224456787109 106.6673736572266 75.90224456787109 C 106.6673736572266 75.90262603759766 106.6673736572266 75.90304565429688 106.6673736572266 75.90343475341797 L 106.6673736572266 75.90462493896484 L 106.6673736572266 75.90581512451172 L 106.6673736572266 75.90619659423828 L 106.6673736572266 75.90738677978516 C 106.6673736572266 75.90777587890625 106.6673736572266 75.908203125 106.6673736572266 75.90857696533203 C 106.6673736572266 75.90857696533203 106.6673736572266 75.90939331054688 106.6677551269531 75.90976715087891 C 106.6677551269531 75.90976715087891 106.6677551269531 75.91016387939453 106.6677551269531 75.91096496582031 L 106.6677551269531 75.91135406494141 C 106.6677551269531 75.91172790527344 106.6677551269531 75.91215515136719 106.6677551269531 75.91254425048828 L 106.6677551269531 75.91373443603516 C 106.6677551269531 75.91411590576172 106.6677551269531 75.91453552246094 106.6677551269531 75.91492462158203 C 106.6673736572266 75.91611480712891 106.6685638427734 75.91653442382813 106.6681365966797 75.91653442382813 L 106.6681365966797 75.917724609375 C 106.6681365966797 75.91811370849609 106.6681365966797 75.91853332519531 106.6681365966797 75.91891479492188 L 106.6681365966797 75.92011260986328 C 106.6681365966797 75.92091369628906 106.6685180664063 75.92172241210938 106.6685180664063 75.92172241210938 L 106.6685180664063 75.92291259765625 C 106.6685180664063 75.92330169677734 106.6685180664063 75.92372131347656 106.6685180664063 75.92410278320313 L 106.6685180664063 75.92449188232422 L 106.6685180664063 75.92529296875 L 106.6685180664063 75.92568206787109 L 106.6688995361328 75.92648315429688 L 106.6688995361328 75.92687225341797 C 106.6688995361328 75.92725372314453 106.6688995361328 75.92767333984375 106.6688995361328 75.92767333984375 C 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 106.6688995361328 75.92806243896484 L 106.6688995361328 75.92926025390625 L 106.6688995361328 75.92963409423828 C 106.6692962646484 75.93002319335938 106.6692962646484 75.93002319335938 106.6692962646484 75.93045043945313 C 106.6692962646484 75.93045043945313 106.6692962646484 75.93082427978516 106.6692962646484 75.93125152587891 L 106.6692962646484 75.931640625 C 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 106.6692962646484 75.93202209472656 L 106.6692962646484 75.93283081054688 C 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 106.669677734375 75.93402099609375 C 106.669677734375 75.93440246582031 106.669677734375 75.93482971191406 106.669677734375 75.93521118164063 L 106.669677734375 75.93559265136719 L 106.669677734375 75.9364013671875 L 106.669677734375 75.93678283691406 C 106.6700592041016 75.93717193603516 106.6700592041016 75.93759155273438 106.6700592041016 75.93759155273438 C 106.6700592041016 75.93840026855469 106.6700592041016 75.93878173828125 106.6700592041016 75.93878173828125 C 106.6956787109375 76.14085388183594 106.8681335449219 76.29694366455078 107.0766143798828 76.29694366455078 C 107.3027038574219 76.29694366455078 107.4859771728516 76.11408233642578 107.4864044189453 75.88796234130859 L 107.4864044189453 75.8875732421875 C 107.4864044189453 75.86675262451172 107.4867858886719 75.81592559814453 107.4904022216797 75.73832702636719 C 107.6692657470703 72.33087921142578 113.96435546875 71.55774688720703 115.681884765625 71.41007232666016 L 115.681884765625 74.24807739257813 C 115.681884765625 74.40816497802734 115.7751159667969 74.55341339111328 115.9203643798828 74.62026214599609 C 116.0664215087891 74.68667602539063 116.2364959716797 74.66347503662109 116.358154296875 74.55902099609375 L 122.0949859619141 69.64173126220703 C 122.1858367919922 69.56409454345703 122.2382354736328 69.45045471191406 122.2382354736328 69.33078765869141 C 122.2383880615234 69.21154022216797 122.1859588623047 69.097900390625 122.0951385498047 69.020263671875 Z"
                          fill="url(#img-path238)"
                        />
                      </Svg>
                      <Svg
                        data-layer="4c6b6d74-055c-4ad8-a9c4-ac921ee8124e"
                        style={
                          styles.x1_group55_group1279_group1277_share_group1264_group1263_path239
                        }
                        preserveAspectRatio="none"
                        viewBox="0 149.32899475097656 17.2105712890625 13.82568359375"
                        fill="transparent"
                      >
                        <Defs>
                          <Pattern
                            id="img-path239"
                            patternContentUnits="userSpaceOnUse"
                            width="100%"
                            height="100%"
                          >
                            <SvgImage
                              xlinkHref={require("../assets/path239.png")}
                              x="0"
                              y="0"
                              width="17.21px"
                              height="13.83px"
                            />
                          </Pattern>
                        </Defs>
                        <SvgPath
                          d="M 16.97202491760254 156.490234375 C 16.82596588134766 156.4092254638672 16.65589714050293 156.4376831054688 16.53384780883789 156.5640258789063 L 15.71431255340576 157.4107971191406 C 15.62388038635254 157.5043487548828 15.57144165039063 157.6412658691406 15.57144165039063 157.7854766845703 L 15.57144165039063 161.1797180175781 L 1.639109373092651 161.1797180175781 L 1.639109373092651 151.3040771484375 L 6.218642234802246 151.3040771484375 C 6.317872047424316 151.3040771484375 6.413528442382813 151.2606506347656 6.487941265106201 151.1820983886719 C 6.813673496246338 150.8397216796875 7.165835380554199 150.5224456787109 7.534401893615723 150.2389068603516 C 7.688066959381104 150.1212310791016 7.758484363555908 149.8950958251953 7.707659244537354 149.6843566894531 C 7.656834125518799 149.4736480712891 7.4963698387146 149.3289947509766 7.314275741577148 149.3289947509766 L 1.639109373092651 149.3289947509766 C 0.7350963950157166 149.3289947509766 0 150.2147827148438 0 151.3040771484375 L 0 161.1796264648438 C 0 162.2689208984375 0.7350963950157166 163.1547546386719 1.639109373092651 163.1547546386719 L 15.57144165039063 163.1547546386719 C 16.47541618347168 163.1547546386719 17.21055221557617 162.2689819335938 17.21055221557617 161.1796264648438 L 17.21055221557617 156.9386291503906 C 17.21051406860352 156.7457580566406 17.11727714538574 156.5707397460938 16.97202491760254 156.490234375 Z"
                          fill="url(#img-path239)"
                        />
                      </Svg>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            data-layer="46bcbbeb-b933-4797-8edd-abb4fc59318c"
            style={styles.x1_group52}
          >
            <View
              data-layer="37551ebc-b77c-473d-bd28-084cd4928379"
              style={styles.x1_group52_inputLight}
            >
              <Svg
                data-layer="62dab3cd-574d-4cfc-855f-c6b24e47f434"
                style={styles.x1_group52_inputLight_bg}
                preserveAspectRatio="none"
                viewBox="-3.092997857834234e-8 0 365 56"
                fill="rgba(54, 181, 165, 1)"
              >
                <SvgPath d="M 26.75392913818359 0 L 338.24609375 0 C 353.0218811035156 0 365.0000305175781 12.53602600097656 365.0000305175781 28 C 365.0000305175781 43.46397399902344 353.0218811035156 56 338.24609375 56 L 26.75392913818359 56 C 11.97813987731934 56 -3.092997857834234e-08 43.46397399902344 -3.092997857834234e-08 28 C -3.092997857834234e-08 12.53602600097656 11.97813987731934 0 26.75392913818359 0 Z" />
              </Svg>
              <View
                data-layer="47b0e8cc-0d44-4ff4-a52f-ff173f1c5c71"
                style={styles.x1_group52_inputLight_group28}
              >
                <Text
                  data-layer="613f8ba4-3fa8-4f16-9123-7c33912c5b73"
                  style={styles.x1_group52_inputLight_group28_typeYourMessage}
                >
                  Type your message
                </Text>
                <ReactImage
                  data-layer="609857b3-64b6-4de6-83c4-0f1bd216c891"
                  source={require("../assets/smile.png")}
                  style={styles.x1_group52_inputLight_group28_smile}
                />
              </View>
            </View>
            <View
              data-layer="bd21db81-3ce9-4819-a439-94f2dfa5b9de"
              style={styles.x1_group52_attachClipboardButton}
            >
              <View
                data-layer="7174c6e3-8ff0-4847-bc94-2d11dabf53a5"
                style={styles.x1_group52_attachClipboardButton_group48}
              >
                <Svg
                  data-layer="18ee3db6-37e9-456c-a99d-a8803c9b60a2"
                  style={
                    styles.x1_group52_attachClipboardButton_group48_path122
                  }
                  preserveAspectRatio="none"
                  viewBox="0 -0.000001430511474609375 24.461181640625 22.247314453125"
                  fill="rgba(255, 255, 255, 1)"
                >
                  <SvgPath d="M 8.016086578369141 20.87351226806641 L 18.1639518737793 10.7256555557251 C 19.38433074951172 9.505276679992676 19.383056640625 7.519009590148926 18.16233825683594 6.298292636871338 C 16.94225692749023 5.078211307525635 14.95696353912354 5.077915191650391 13.73658561706543 6.298292636871338 L 8.514575958251953 11.52560710906982 C 8.261020660400391 11.77945899963379 8.261148452758789 12.19071006774902 8.514830589294434 12.4443941116333 L 8.874734878540039 12.80429744720459 C 9.128501892089844 13.05806541442871 9.539925575256348 13.05806541442871 9.793692588806152 12.80429744720459 L 15.08752155303955 7.510387420654297 C 15.60907173156738 7.059170246124268 16.40503311157227 7.086731433868408 16.8953685760498 7.59006404876709 C 17.40252113342285 8.110637664794922 17.38141250610352 8.948347091674805 16.86754989624023 9.462251663208008 L 6.734889984130859 19.59490585327148 C 5.609859943389893 20.71988868713379 3.777847766876221 20.71925163269043 2.653199911117554 19.59456253051758 C 1.527235746383667 18.46859931945801 1.526598811149597 16.6365909576416 2.652902603149414 15.510329246521 L 15.05210113525391 3.11109733581543 C 16.79288482666016 1.37031626701355 19.62667274475098 1.375750422477722 21.36104011535645 3.122606992721558 C 23.09443473815918 4.868485927581787 23.05879974365234 7.699978828430176 21.31907844543457 9.439656257629395 L 11.9213924407959 18.83737945556641 C 11.66762351989746 19.09114646911621 11.66762351989746 19.5025691986084 11.9213924407959 19.75633811950684 L 12.28231620788574 20.11725997924805 C 12.53612613677979 20.37106895446777 12.9475040435791 20.37106895446777 13.20131587982178 20.11725997924805 L 22.66309356689453 10.65549182891846 C 25.07153129577637 8.210570335388184 25.0606575012207 4.262331485748291 22.62949752807617 1.831171870231628 C 20.19833946228027 -0.5999826788902283 16.25102806091309 -0.6099226474761963 13.80644989013672 1.798810362815857 L 1.372639417648315 14.23265933990479 C -0.4577586650848389 16.06305694580078 -0.457758754491806 19.04213905334473 1.373913288116455 20.87384796142578 C 3.205287933349609 22.70518112182617 6.184415340423584 22.70518112182617 8.016086578369141 20.87351226806641 Z" />
                </Svg>
                <Svg
                  data-layer="8cd1015b-064e-4ad3-9441-32fc150b2e07"
                  style={
                    styles.x1_group52_attachClipboardButton_group48_path123
                  }
                  preserveAspectRatio="none"
                  viewBox="-1.1920928955078125e-7 -1.1920928955078125e-7 24.499755859375 22.28973388671875"
                  fill="rgba(255, 255, 255, 1)"
                >
                  <SvgPath d="M 4.716219902038574 22.28975296020508 C 4.716050148010254 22.28975296020508 4.716093063354492 22.28975296020508 4.715922355651855 22.28975296020508 C 3.454431295394897 22.28971290588379 2.269729137420654 21.79971694946289 1.380077004432678 20.91011047363281 C -0.4595373272895813 19.07049560546875 -0.4600893557071686 16.07777976989746 1.378803133964539 14.23888874053955 L 13.8126163482666 1.805043697357178 C 14.99396324157715 0.6410244107246399 16.56035804748535 0 18.22328948974609 0 C 19.90321159362793 0 21.48086166381836 0.6525339484214783 22.66573333740234 1.83740508556366 C 25.0979118347168 4.269538879394531 25.11298751831055 8.241522789001465 22.6994571685791 10.69166564941406 L 13.23750686645508 20.15347480773926 C 13.11077117919922 20.28021430969238 12.94224452972412 20.35003471374512 12.76297187805176 20.35003471374512 C 12.58374118804932 20.35003471374512 12.41521549224854 20.28021049499512 12.28847980499268 20.15347480773926 L 11.92755508422852 19.79255294799805 C 11.80082035064697 19.66581916809082 11.73099803924561 19.49733734130859 11.73099803924561 19.31806373596191 C 11.73099803924561 19.13879013061523 11.80082130432129 18.97030830383301 11.92755508422852 18.84357261657715 L 21.32524490356445 9.445847511291504 C 23.06398963928223 7.707146167755127 23.08280372619629 4.886736869812012 21.36716270446777 3.158782482147217 C 20.5301342010498 2.315679311752319 19.41308975219727 1.851421594619751 18.22180366516113 1.851421594619751 C 17.03680419921875 1.851421594619751 15.92392158508301 2.311644792556763 15.08829402923584 3.14731502532959 L 2.689093828201294 15.54654502868652 C 2.148430824279785 16.0871639251709 1.850747346878052 16.80714225769043 1.850874781608582 17.57375335693359 C 1.851001977920532 18.34028244018555 2.148812770843506 19.06013298034668 2.689391136169434 19.60075187683105 C 3.229502439498901 20.14090538024902 3.949097871780396 20.43833541870117 4.715583324432373 20.43833541870117 C 5.481855392456055 20.43833541870117 6.201154232025146 20.14099311828613 6.741053581237793 19.6010913848877 L 16.87371253967285 9.468482971191406 C 17.38273429870605 8.959419250488281 17.3951358795166 8.132963180541992 16.90131950378418 7.626152038574219 C 16.65472984313965 7.373021602630615 16.32374572753906 7.233628273010254 15.96944999694824 7.233628273010254 C 15.65745162963867 7.233628273010254 15.35666847229004 7.345160484313965 15.12260913848877 7.547707080841064 L 9.82988452911377 12.84051322937012 C 9.703149795532227 12.96724796295166 9.534621238708496 13.03707218170166 9.355391502380371 13.03707218170166 C 9.176161766052246 13.03707218170166 9.007634162902832 12.96724796295166 8.880899429321289 12.84051322937012 L 8.52099609375 12.48061084747314 C 8.25949764251709 12.21911144256592 8.259369850158691 11.79345989227295 8.52074146270752 11.53179454803467 L 13.74275016784668 6.30448055267334 C 14.33692741394043 5.710301876068115 15.12813091278076 5.383101940155029 15.97059726715088 5.383101940155029 C 16.81315040588379 5.383101940155029 17.60439300537109 5.71034574508667 18.19852828979492 6.30448055267334 C 18.79300308227539 6.898955345153809 19.12058639526367 7.690496921539307 19.12096977233887 8.533302307128906 C 19.12139511108398 9.376235008239746 18.79436302185059 10.16769313812256 18.20014381408691 10.76186943054199 L 8.052278518676758 20.90976715087891 C 7.162413120269775 21.79963302612305 5.977540969848633 22.28975296020508 4.716219902038574 22.28975296020508 Z M 18.22328948974609 0.04247135668992996 C 16.57156753540039 0.04247135668992996 15.01579475402832 0.6791214346885681 13.84251689910889 1.835155844688416 L 1.408830642700195 14.26887512207031 C -0.4134978353977203 16.0912036895752 -0.4129458069801331 19.05694580078125 1.410104632377625 20.88003921508789 C 2.29172945022583 21.76166534423828 3.465771913528442 22.2471981048584 4.715923309326172 22.24723815917969 C 4.716008186340332 22.24723815917969 4.716135025024414 22.24723815917969 4.716219902038574 22.24723815917969 C 5.966286659240723 22.24723815917969 7.140370845794678 21.76157760620117 8.022252082824707 20.87969779968262 L 18.17011451721191 10.73184490203857 C 18.75626373291016 10.1456937789917 19.07888031005859 9.364895820617676 19.07849502563477 8.533302307128906 C 19.0781135559082 7.701836585998535 18.75494766235352 6.920954704284668 18.16850090026855 6.334508419036865 C 17.58234977722168 5.748358726501465 16.80176734924316 5.425573348999023 15.97059535980225 5.425573348999023 C 15.13947010040283 5.425573348999023 14.35892772674561 5.748400688171387 13.77277660369873 6.334508419036865 L 8.550766944885254 11.56182289123535 C 8.305962562561035 11.80692672729492 8.306047439575195 12.20560646057129 8.551022529602051 12.45058250427246 L 8.91092586517334 12.81048488616943 C 9.029634475708008 12.92919445037842 9.187500953674316 12.99460124969482 9.355390548706055 12.99460124969482 C 9.523281097412109 12.99460124969482 9.681106567382813 12.92919445037842 9.799856185913086 12.81048488616943 L 15.09372711181641 7.516617298126221 C 15.3366641998291 7.306383609771729 15.64730167388916 7.191158771514893 15.96949005126953 7.191158771514893 C 16.33538246154785 7.191158771514893 16.67715263366699 7.335136413574219 16.93181228637695 7.596507549285889 C 17.44172668457031 8.119884490966797 17.42915344238281 8.973137855529785 16.90378189086914 9.498553276062012 L 6.771080493927002 19.63111686706543 C 6.223154544830322 20.17900085449219 5.493195056915283 20.48080635070801 4.715582370758057 20.48080635070801 C 3.937758207321167 20.48080635070801 3.207501649856567 20.1789608001709 2.659363269805908 19.63078117370605 C 2.110758066177368 19.08213233947754 1.80853009223938 18.35161781311035 1.80840277671814 17.57375526428223 C 1.80827534198761 16.79576301574707 2.110375881195068 16.06512451171875 2.659066200256348 15.51652050018311 L 15.05826473236084 3.117286920547485 C 15.90196228027344 2.273587942123413 17.02546310424805 1.808950185775757 18.22180366516113 1.808950185775757 C 19.42447090148926 1.808950185775757 20.55221939086914 2.277708292007446 21.39727592468262 3.128882169723511 C 23.12935256958008 4.87344217300415 23.11053848266602 7.720693111419678 21.35527038574219 9.475915908813477 L 11.95758152008057 18.87364196777344 C 11.83887386322021 18.99235153198242 11.77346801757813 19.15021324157715 11.77346801757813 19.3181037902832 C 11.77346801757813 19.48599433898926 11.83887386322021 19.64386367797852 11.95758152008057 19.76256942749023 L 12.31850528717041 20.12349128723145 C 12.437255859375 20.24224090576172 12.59512233734131 20.30760383605957 12.76296997070313 20.30760383605957 C 12.93085956573486 20.30760383605957 13.0887279510498 20.24224090576172 13.20747756958008 20.12349128723145 L 22.66925621032715 10.66172122955322 C 25.06635475158691 8.228311538696289 25.05136108398438 4.283129692077637 22.63566207885742 1.867431402206421 C 21.45881843566895 0.6905450820922852 19.8918285369873 0.04247135668992996 18.22328948974609 0.04247135668992996 Z" />
                </Svg>
              </View>
            </View>
          </View>
          <ReactImage
            data-layer="e9c3e2e0-b6aa-4ce1-9a4a-fd58a708c003"
            source={require("../assets/ios111AutocorrectBug.png")}
            style={styles.x1_ios111AutocorrectBug}
          />
          <View
            data-layer="6141d515-9e9c-4694-abfb-03d0e9651644"
            style={styles.x1_group5}
          >
            <View
              data-layer="a8b79489-af42-4631-aa3d-e3f56aa93940"
              style={styles.x1_group5_rectangle3}
            ></View>
            <Svg
              data-layer="f9677c70-8fb8-4e0b-81a2-eedcaa63b67b"
              style={styles.x1_group5_ellipse1}
              preserveAspectRatio="none"
              viewBox="0 0 53 53"
              fill="rgba(255, 255, 255, 1)"
            >
              <SvgPath d="M 26.5 0 C 41.13554382324219 0 53 11.8644552230835 53 26.5 C 53 41.13554382324219 41.13554382324219 53 26.5 53 C 11.8644552230835 53 0 41.13554382324219 0 26.5 C 0 11.8644552230835 11.8644552230835 0 26.5 0 Z" />
            </Svg>
            <Svg
              data-layer="204e0afa-a5a9-4809-b83e-5d557aa00ff4"
              style={styles.x1_group5_ellipse2}
              preserveAspectRatio="none"
              viewBox="0 0 53 53"
              fill="rgba(255, 255, 255, 1)"
            >
              <SvgPath d="M 26.5 0 C 41.13554382324219 0 53 11.8644552230835 53 26.5 C 53 41.13554382324219 41.13554382324219 53 26.5 53 C 11.8644552230835 53 0 41.13554382324219 0 26.5 C 0 11.8644552230835 11.8644552230835 0 26.5 0 Z" />
            </Svg>
            <View
              data-layer="42ab2dd8-1abc-4e83-b450-6f1c4ec58d73"
              style={styles.x1_group5_group1252}
            >
              <Svg
                data-layer="03fb56db-664d-40f6-969d-19bd0afe0746"
                style={styles.x1_group5_group1252_ellipse3}
                preserveAspectRatio="none"
                viewBox="0 0 80 80"
                fill="rgba(255, 255, 255, 1)"
              >
                <SvgPath d="M 40 0 C 62.09139251708984 0 80 17.90860939025879 80 40 C 80 62.09139251708984 62.09139251708984 80 40 80 C 17.90860939025879 80 0 62.09139251708984 0 40 C 0 17.90860939025879 17.90860939025879 0 40 0 Z" />
              </Svg>
              <Svg
                data-layer="c60e095b-9a24-486b-89fe-da9cd62130c2"
                style={styles.x1_group5_group1252_plus}
                preserveAspectRatio="none"
                viewBox="430.4129333496094 222.9259796142578 58.22900390625 58.22711181640625"
                fill="transparent"
              >
                <Defs>
                  <Pattern
                    id="img-plus"
                    patternContentUnits="userSpaceOnUse"
                    width="100%"
                    height="100%"
                  >
                    <SvgImage
                      xlinkHref={require("../assets/plus.png")}
                      x="0"
                      y="0"
                      width="56.73px"
                      height="56.73px"
                    />
                  </Pattern>
                </Defs>
                <SvgPath
                  d="M 485.0554809570313 249.2023620605469 L 462.3638000488281 249.2023620605469 L 462.3638000488281 226.5108947753906 C 462.3626098632813 224.9443359375 461.0921020507813 223.6754150390625 459.5255126953125 223.6759796142578 C 457.9606628417969 223.6770935058594 456.6917724609375 224.9459991455078 456.6911010742188 226.5108947753906 L 456.6911010742188 249.2023620605469 L 433.9996337890625 249.2023620605469 C 432.4330139160156 249.2023620605469 431.1629333496094 250.4724273681641 431.1629333496094 252.0390014648438 C 431.1629333496094 253.6055297851563 432.4330139160156 254.8749389648438 433.9996337890625 254.8749389648438 L 456.6911010742188 254.8749389648438 L 456.6911010742188 277.5665283203125 C 456.6911010742188 279.1330261230469 457.9611511230469 280.4030456542969 459.5272827148438 280.4030456542969 C 461.09375 280.4030456542969 462.3638000488281 279.1330261230469 462.3638000488281 277.5665283203125 L 462.3638000488281 254.8749389648438 L 485.0554809570313 254.8749389648438 C 486.6220703125 254.8749389648438 487.8919372558594 253.6055297851563 487.8919372558594 252.0390014648438 C 487.8919372558594 250.4724273681641 486.6220703125 249.2023620605469 485.0554809570313 249.2023620605469 Z"
                  fill="url(#img-plus)"
                />
              </Svg>
            </View>
            <Svg
              data-layer="69fdf952-4e2b-4e18-8e11-0689e3dded3e"
              style={styles.x1_group5_home}
              preserveAspectRatio="none"
              viewBox="-0.00021064281463623047 -0.0006561875343322754 30.587890625 30.59100341796875"
              fill="transparent"
            >
              <Defs>
                <Pattern
                  id="img-home"
                  patternContentUnits="userSpaceOnUse"
                  width="100%"
                  height="100%"
                >
                  <SvgImage
                    xlinkHref={require("../assets/home.png")}
                    x="0"
                    y="0"
                    width="30.59px"
                    height="30.59px"
                  />
                </Pattern>
              </Defs>
              <SvgPath
                d="M 29.76597023010254 13.30497074127197 C 29.7652702331543 13.30427074432373 29.76457023620605 13.30357074737549 29.76387023925781 13.30287075042725 L 17.28519630432129 0.8246134519577026 C 16.75329971313477 0.2924826443195343 16.04612350463867 -0.0006561279296875 15.29390907287598 -0.0006561279296875 C 14.54169368743896 -0.0006561279296875 13.83451557159424 0.2922490239143372 13.30238819122314 0.8243804574012756 L 0.8302261829376221 13.29630374908447 C 0.8260250687599182 13.30050468444824 0.8218240141868591 13.30493927001953 0.8176230192184448 13.3091402053833 C -0.2746486663818359 14.4077091217041 -0.2727785706520081 16.19012069702148 0.8229910731315613 17.28588676452637 C 1.323614478111267 17.7867431640625 1.984809041023254 18.07685089111328 2.691747665405273 18.1071891784668 C 2.720454931259155 18.1099910736084 2.749395608901978 18.11139106750488 2.778568983078003 18.11139106750488 L 3.275924682617188 18.11139106750488 L 3.275924682617188 27.29460144042969 C 3.275924682617188 29.11178398132324 4.754456043243408 30.59031677246094 6.572103977203369 30.59031677246094 L 11.45416831970215 30.59031677246094 C 11.94895648956299 30.59031677246094 12.35038948059082 30.18911743164063 12.35038948059082 29.69409370422363 L 12.35038948059082 22.49445724487305 C 12.35038948059082 21.66522026062012 13.02488994598389 20.99071884155273 13.85412693023682 20.99071884155273 L 16.73369979858398 20.99071884155273 C 17.56293869018555 20.99071884155273 18.23744010925293 21.66522026062012 18.23744010925293 22.49445724487305 L 18.23744010925293 29.69409370422363 C 18.23744010925293 30.18911743164063 18.63863945007324 30.59031677246094 19.13365936279297 30.59031677246094 L 24.01572608947754 30.59031677246094 C 25.83337593078613 30.59031677246094 27.31190490722656 29.11178398132324 27.31190490722656 27.29460144042969 L 27.31190490722656 18.11139106750488 L 27.77308464050293 18.11139106750488 C 28.52507019042969 18.11139106750488 29.23224830627441 17.81848526000977 29.76460838317871 17.28635406494141 C 30.86154365539551 16.18871879577637 30.86200904846191 14.40327739715576 29.76600646972656 13.30494022369385 Z M 29.76597023010254 13.30497074127197"
                fill="url(#img-home)"
              />
            </Svg>
            <View
              data-layer="5cbf10a2-cf45-4186-b082-f22f336b7951"
              style={styles.x1_group5_chatBubblesWithEllipsis1}
            >
              <Svg
                data-layer="84d0c5bf-8195-49ca-9048-4c8fce248d8c"
                style={styles.x1_group5_chatBubblesWithEllipsis1_path227}
                preserveAspectRatio="none"
                viewBox="0 3.239999771118164 33.7987060546875 27.1221923828125"
                fill="transparent"
              >
                <Defs>
                  <Pattern
                    id="img-path227"
                    patternContentUnits="userSpaceOnUse"
                    width="100%"
                    height="100%"
                  >
                    <SvgImage
                      xlinkHref={require("../assets/path227.png")}
                      x="0"
                      y="0"
                      width="33.80px"
                      height="27.12px"
                    />
                  </Pattern>
                </Defs>
                <SvgPath
                  d="M 4.20923900604248 3.239999771118164 L 29.09027862548828 3.239999771118164 C 31.27939414978027 3.239999771118164 33.79869842529297 5.184726238250732 33.79869842529297 7.059255123138428 L 33.79869842529297 22.1386833190918 C 33.79869842529297 23.86501502990723 31.6641788482666 25.11166954040527 29.61676025390625 25.3040599822998 L 30.9492073059082 30.3621711730957 L 22.41113662719727 25.33915901184082 L 4.209236145019531 25.33915901184082 C 2.020120859146118 25.33915901184082 0 24.01191139221191 0 22.1386833190918 L 0 9.938644409179688 L 0 7.059255123138428 C 0 5.184726238250732 2.021422386169434 3.239999771118164 4.20923900604248 3.239999771118164 Z M 25.29442596435547 15.9691162109375 C 26.5358772277832 15.9691162109375 27.54203796386719 14.9629545211792 27.54203796386719 13.72150135040283 C 27.54203796386719 12.48004817962646 26.5358772277832 11.47388648986816 25.29442596435547 11.47388648986816 C 24.05427169799805 11.47388648986816 23.04681205749512 12.48004817962646 23.04681205749512 13.72150135040283 C 23.04681205749512 14.9629545211792 24.05427169799805 15.9691162109375 25.29442596435547 15.9691162109375 Z M 16.89934921264648 15.9691162109375 C 18.14080047607422 15.9691162109375 19.1469612121582 14.9629545211792 19.1469612121582 13.72150135040283 C 19.1469612121582 12.48004817962646 18.14080047607422 11.47388744354248 16.89934921264648 11.47388744354248 C 15.65789604187012 11.47388744354248 14.65173530578613 12.48004913330078 14.65173530578613 13.72150230407715 C 14.65173530578613 14.96295547485352 15.65789604187012 15.9691162109375 16.89934921264648 15.9691162109375 Z M 8.502972602844238 15.9691162109375 C 9.744424819946289 15.9691162109375 10.75188541412354 14.9629545211792 10.75188541412354 13.72150135040283 C 10.75188541412354 12.48004817962646 9.744424819946289 11.47388648986816 8.502972602844238 11.47388648986816 C 7.264121532440186 11.47388648986816 6.255359172821045 12.48004817962646 6.255359172821045 13.72150135040283 C 6.255359172821045 14.9629545211792 7.264119148254395 15.9691162109375 8.502972602844238 15.9691162109375 Z"
                  fill="url(#img-path227)"
                />
              </Svg>
            </View>
          </View>
          <Svg
            data-layer="39dee6d7-3902-4f85-86d5-a362c8ec238d"
            style={styles.x1_path1d13131c7}
            preserveAspectRatio="none"
            viewBox="-8.461540801363299e-9 0 375 80"
            fill="rgba(255, 255, 255, 1)"
          >
            <SvgPath d="M 0 0 L 375 0 C 375 0 375 40.45474243164063 375 80 C 275 80 234.7308654785156 80 188.216064453125 80 C 141.7012634277344 80 100 80 0 80 C -1.903846680306742e-08 41.92367935180664 0 0 0 0 Z" />
          </Svg>
          <Svg
            data-layer="6f054345-b01d-4da4-822f-ae29671d44f0"
            style={styles.x1_path1}
            preserveAspectRatio="none"
            viewBox="-8.461540801363299e-9 0 375 100"
            fill="rgba(54, 181, 165, 1)"
          >
            <SvgPath d="M 0 0 L 375 0 C 375 0 375 50.56842422485352 375 100 C 275 100 234.7308654785156 100 188.216064453125 100 C 141.7012634277344 100 100 100 0 100 C -1.903846680306742e-08 52.40460205078125 0 0 0 0 Z" />
          </Svg>
          <View
            data-layer="364b3ebc-c4eb-4067-bbf3-161ad945c472"
            style={styles.x1_rectangle2}
          ></View>
          <Text
            data-layer="1bed1fcb-ff7d-4949-8667-00ecd12d4ab1"
            style={styles.x1_search}
          >
            Search
          </Text>
          <Svg
            data-layer="b16dcc6f-5595-4b82-8fe6-2f5aed74419c"
            style={styles.x1_menu}
            preserveAspectRatio="none"
            viewBox="72.9999008178711 718.000244140625 22.00048828125 17.00006103515625"
            fill="transparent"
          >
            <Defs>
              <Pattern
                id="img-menu"
                patternContentUnits="userSpaceOnUse"
                width="100%"
                height="100%"
              >
                <SvgImage
                  xlinkHref={require("../assets/menu.png")}
                  x="0"
                  y="0"
                  width="22.00px"
                  height="17.00px"
                />
              </Pattern>
            </Defs>
            <SvgPath
              d="M 73.99980163574219 735.0003051757813 C 73.44810485839844 735.0003051757813 72.99990081787109 734.5521240234375 72.99990081787109 734.0004272460938 L 72.99990081787109 732.9996337890625 C 72.99990081787109 732.4479370117188 73.44810485839844 731.9996948242188 73.99980163574219 731.9996948242188 L 93.99960327148438 731.9996948242188 C 94.55220031738281 731.9996948242188 95.00040435791016 732.4479370117188 95.00040435791016 732.9996337890625 L 95.00040435791016 734.0004272460938 C 95.00040435791016 734.5521240234375 94.55220031738281 735.0003051757813 93.99960327148438 735.0003051757813 L 73.99980163574219 735.0003051757813 Z M 73.99980163574219 728.0001220703125 C 73.44810485839844 728.0001220703125 72.99990081787109 727.5519409179688 72.99990081787109 727.000244140625 L 72.99990081787109 726.0003051757813 C 72.99990081787109 725.4476928710938 73.44810485839844 725.0004272460938 73.99980163574219 725.0004272460938 L 93.99960327148438 725.0004272460938 C 94.55220031738281 725.0004272460938 95.00040435791016 725.4476928710938 95.00040435791016 726.0003051757813 L 95.00040435791016 727.000244140625 C 95.00040435791016 727.5519409179688 94.55220031738281 728.0001220703125 93.99960327148438 728.0001220703125 L 73.99980163574219 728.0001220703125 Z M 73.99980163574219 720.9999389648438 C 73.44810485839844 720.9999389648438 72.99990081787109 720.5526123046875 72.99990081787109 720 L 72.99990081787109 719.0001220703125 C 72.99990081787109 718.447509765625 73.44810485839844 718.000244140625 73.99980163574219 718.000244140625 L 93.99960327148438 718.000244140625 C 94.55220031738281 718.000244140625 95.00040435791016 718.447509765625 95.00040435791016 719.0001220703125 L 95.00040435791016 720 C 95.00040435791016 720.5526123046875 94.55220031738281 720.9999389648438 93.99960327148438 720.9999389648438 L 73.99980163574219 720.9999389648438 Z"
              fill="url(#img-menu)"
            />
          </Svg>
          <View
            data-layer="a831223b-db6d-4891-8858-b6e52d98938c"
            style={styles.x1_rectangle14}
          ></View>
          <View
            data-layer="f05fddcd-83fe-47f1-9504-d7f1dc325300"
            style={styles.x1_rectangle346}
          ></View>
          <View
            data-layer="d2c65956-8fbf-4f0d-b0d9-f979a55c30ae"
            style={styles.x1_rectangle347}
          ></View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  x1: {
    opacity: 1,
    position: "relative",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 375,
    height: 3258,
    left: 0,
    top: 0,
  },
  x1_loader: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 50,
    height: 50,
    left: 153,
    top: 28,
  },
  x1_loader_x2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 70,
    height: 70,
    left: -10,
    top: -10,
  },
  x1_loader_x1f994d31b: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 60,
    height: 60,
    left: -5,
    top: -5,
  },
  x1_group55: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 376,
    height: 3012,
    left: 0,
    top: 78,
  },
  x1_group55_group2: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 376,
    height: 565,
    left: 0,
    top: 1236,
  },
  x1_group55_group2_rectangle9263555c7: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "rgb(0,  0,  0)",
    shadowOpacity: 0.3686274509803922,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 375,
    height: 565,
    left: 1,
    top: 0,
  },
  x1_group55_group2_line27e8925c7: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 1,
    left: 9.5,
    top: 517.1,
  },
  x1_group55_group2_badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194686030dcc2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 376,
    left: 0,
    top: 114,
  },
  x1_group55_group2_group279d138669: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 232,
    height: 44,
    left: 15,
    top: 20,
  },
  x1_group55_group2_group279d138669_electricBikeDevelopingClubCoep: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 174,
    height: 15,
    left: 58,
    top: 22,
  },
  x1_group55_group2_group279d138669_deltaClub: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 0.7803921568627451)",
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 78,
    height: 22,
    left: 58,
    top: 0,
  },
  x1_group55_group2_group279d138669_ellipse12fcc1c7c: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 45,
    height: 44,
    left: 0,
    top: 0,
  },
  x1_group55_group2_weAreProudToAnnounceThatOurClubHasInventedTheFirstEverCvJointWhichSeeMore: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 350,
    height: 44,
    left: 14,
    top: 71,
  },
  x1_group55_group2_group1250: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 102,
    height: 20,
    left: 9,
    top: 495,
  },
  x1_group55_group2_group1250_rectangle3522f609cad: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: 102,
    height: 20,
    left: 0,
    top: 0,
  },
  x1_group55_group2_group1250_x5Comments: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(114, 114, 114, 0.7490196078431373)",
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    lineHeight: 19,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 71,
    height: 23,
    left: 12,
    top: -1,
  },
  x1_group55_group3: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 376,
    height: 607,
    left: 0,
    top: 1808,
  },
  x1_group55_group3_rectangle9961f913c: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "rgb(0,  0,  0)",
    shadowOpacity: 0.3686274509803922,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 375,
    height: 607,
    left: 1,
    top: 0,
  },
  x1_group55_group3_line2c7a57756: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 1,
    left: 9.5,
    top: 559.28,
  },
  x1_group55_group3_badBoysForLife5120x5120WillSmithMartinLawrence4k5k202019468cf847c17: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 376,
    left: 0,
    top: 156,
  },
  x1_group55_group3_group27dacd30fa: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 240,
    height: 44,
    left: 15,
    top: 20,
  },
  x1_group55_group3_group27dacd30fa_instrumentationSecondYearECell: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 182,
    height: 15,
    left: 58,
    top: 22,
  },
  x1_group55_group3_group27dacd30fa_akashMehta: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 0.7803921568627451)",
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 98,
    height: 22,
    left: 58,
    top: 0,
  },
  x1_group55_group3_group27dacd30fa_ellipse1fb725fe1: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 45,
    height: 44,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group27dacd30fa_studentac2cde94: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 7,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 25,
    height: 10,
    left: 170,
    top: 8,
  },
  x1_group55_group3_group27dacd30fa_radioButton125ce17d: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4,
    height: 4,
    left: 161,
    top: 11,
  },
  x1_group55_group3_group27dacd30fa_radioButton125ce17d_dot2b9b35353: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4,
    height: 4,
    left: 0,
    top: 0,
  },
  x1_group55_group3_helloGuyImSharingOneOfMyRecentProjectInCtisCentralTyreInflationSystemimDesignedTheRotaryUnionAndNeedSomeoneWithKnowledgeOfElectronicsAndControllerINeedToProgramTheThePressureSignalInSuchAWayThatThePumpsee: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 350,
    height: 80,
    left: 14,
    top: 72,
  },
  x1_group55_group3_group12517183999c: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 102,
    height: 20,
    left: 9,
    top: 537,
  },
  x1_group55_group3_group12517183999c_rectangle352185bc780: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: 102,
    height: 20,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group12517183999c_x38Comments5012e77a: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(114, 114, 114, 0.7490196078431373)",
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    lineHeight: 19,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 78,
    height: 23,
    left: 12,
    top: -1,
  },
  x1_group55_group3_group127766972e3d: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 43,
    left: 9,
    top: 563,
  },
  x1_group55_group3_group127766972e3d_rectangle1057811528: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_rectangle1189232837: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 96,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_rectangle12e36d8af8: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 196,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_rectangle13d057e1de: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 296,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_like77efffc9: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19,
    height: 15,
    left: 18,
    top: 22,
  },
  x1_group55_group3_group127766972e3d_commentc1176ac7: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 48,
    height: 15,
    left: 103,
    top: 22,
  },
  x1_group55_group3_group127766972e3d_likeb9c27a98: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.61,
    height: 14.66,
    left: 20.19,
    top: 7,
  },
  x1_group55_group3_group127766972e3d_likeb9c27a98_group1260456a87a4: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 6.2,
  },
  x1_group55_group3_group127766972e3d_likeb9c27a98_group1260456a87a4_group12596d0a3873: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_likeb9c27a98_group1260456a87a4_group12596d0a3873_path23604a2bbaa: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_likeb9c27a98_group1262cbba1c44: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 5.2,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_likeb9c27a98_group1262cbba1c44_group1261e9b9e616: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_likeb9c27a98_group1262cbba1c44_group1261e9b9e616_path237232afbbe: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_chatBubblesWithEllipsis1373c8dec: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 118.16,
    top: 7.34,
  },
  x1_group55_group3_group127766972e3d_chatBubblesWithEllipsis1373c8dec_path227cddbe926: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_bookmarkdf6bf805: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 49,
    height: 15,
    left: 202,
    top: 21,
  },
  x1_group55_group3_group127766972e3d_bookmarkb35b76c9: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 222,
    top: 6.69,
  },
  x1_group55_group3_group127766972e3d_bookmarkb35b76c9_group12278525d3da: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_bookmarkb35b76c9_group12278525d3da_path216b45b61c2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 11.63,
    height: 17.03,
    left: -1,
    top: -1,
  },
  x1_group55_group3_group127766972e3d_shareb944f669: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 27,
    height: 15,
    left: 313,
    top: 22,
  },
  x1_group55_group3_group127766972e3d_share4f33d28b: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 317.16,
    top: 6.07,
  },
  x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5_group126361e81bb2: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5_group126361e81bb2_path238a261a3bd: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.57,
    height: 12.29,
    left: 4.1,
    top: 0,
  },
  x1_group55_group3_group127766972e3d_share4f33d28b_group12642e654bf5_group126361e81bb2_path239bd11e57b: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.21,
    height: 13.83,
    left: 0,
    top: 2.62,
  },
  x1_group55_group53: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 376,
    height: 607,
    left: 0,
    top: 0,
  },
  x1_group55_group53_rectangle92602ee93: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "rgb(0,  0,  0)",
    shadowOpacity: 0.3686274509803922,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 375,
    height: 607,
    left: 1,
    top: 0,
  },
  x1_group55_group53_line26e92df6b: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 1,
    left: 9.5,
    top: 559.28,
  },
  x1_group55_group53_badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194680867b018: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 376,
    left: 0,
    top: 156,
  },
  x1_group55_group53_group27fb4ad8f7: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 295,
    height: 52,
    left: 15,
    top: 20,
  },
  x1_group55_group53_group27fb4ad8f7_transmissionEngineerAtOctaneAiEnthusiastProductionEngineeringStudent: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 237,
    height: 30,
    left: 58,
    top: 22,
  },
  x1_group55_group53_group27fb4ad8f7_aniketJha: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 0.7803921568627451)",
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 81,
    height: 22,
    left: 58,
    top: 0,
  },
  x1_group55_group53_group27fb4ad8f7_student: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 7,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 25,
    height: 10,
    left: 153,
    top: 8,
  },
  x1_group55_group53_group27fb4ad8f7_ellipse174b251b3: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 45,
    height: 44,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group27fb4ad8f7_radioButton2d572206: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4,
    height: 4,
    left: 144,
    top: 11,
  },
  x1_group55_group53_group27fb4ad8f7_radioButton2d572206_dot2c52c9d36: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4,
    height: 4,
    left: 0,
    top: 0,
  },
  x1_group55_group53_googleHasDevelopedAVeryExcitingApiGpt3WhichIsAnOpenSourceLibraryItCameUpWithABoomAsTheDevelopersShowedYouJustHaveToDescribeTheWebPageAndTheAiModelWillCodeItForYouIHaveDevelopedACodeUsingGpt2Tose: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 350,
    height: 89,
    left: 14,
    top: 72,
  },
  x1_group55_group53_path59: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 2,
    height: 2,
    left: 132.5,
    top: 55.5,
  },
  x1_group55_group53_path60: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 2,
    height: 2,
    left: 216.5,
    top: 55.5,
  },
  x1_group55_group53_group285a04c7fd: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 43,
    left: 9,
    top: 563,
  },
  x1_group55_group53_group285a04c7fd_rectangle109c61166a: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_rectangle117851100d: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 96,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_rectangle123167b487: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 196,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_rectangle136ac38321: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 296,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_like90ae7232: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19,
    height: 15,
    left: 18,
    top: 22,
  },
  x1_group55_group53_group285a04c7fd_comment6d1d50c5: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 48,
    height: 15,
    left: 103,
    top: 22,
  },
  x1_group55_group53_group285a04c7fd_like3ba89d20: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.61,
    height: 14.66,
    left: 20.19,
    top: 7,
  },
  x1_group55_group53_group285a04c7fd_like3ba89d20_group1260a42e4ef3: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 6.2,
  },
  x1_group55_group53_group285a04c7fd_like3ba89d20_group1260a42e4ef3_group125948e14fb2: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_like3ba89d20_group1260a42e4ef3_group125948e14fb2_path2365cb28415: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_like3ba89d20_group1262c742cb36: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 5.2,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_like3ba89d20_group1262c742cb36_group12611bcf0d3c: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_like3ba89d20_group1262c742cb36_group12611bcf0d3c_path23760f96ef1: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_chatBubblesWithEllipsis12a07df00: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 118.16,
    top: 7.34,
  },
  x1_group55_group53_group285a04c7fd_chatBubblesWithEllipsis12a07df00_path22764c3c28e: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_bookmark00c1e84c: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 49,
    height: 15,
    left: 202,
    top: 21,
  },
  x1_group55_group53_group285a04c7fd_bookmarka259e90f: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 222,
    top: 6.69,
  },
  x1_group55_group53_group285a04c7fd_bookmarka259e90f_group1227d7e23dfc: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_bookmarka259e90f_group1227d7e23dfc_path216f57cb052: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 11.63,
    height: 17.03,
    left: -1,
    top: -1,
  },
  x1_group55_group53_group285a04c7fd_share324c9102: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 27,
    height: 15,
    left: 313,
    top: 22,
  },
  x1_group55_group53_group285a04c7fd_share016666d8: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 317.16,
    top: 6.07,
  },
  x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4_group1263a9991fff: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4_group1263a9991fff_path238a3a2a366: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.57,
    height: 12.29,
    left: 4.1,
    top: 0,
  },
  x1_group55_group53_group285a04c7fd_share016666d8_group1264ce6f54b4_group1263a9991fff_path23991552ac8: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.21,
    height: 13.83,
    left: 0,
    top: 2.62,
  },
  x1_group55_group53_group1249750e5895: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 102,
    height: 20,
    left: 9,
    top: 537,
  },
  x1_group55_group53_group1249750e5895_rectangle352e3d6b27d: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: 102,
    height: 20,
    left: 0,
    top: 0,
  },
  x1_group55_group53_group1249750e5895_x42Comments: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(114, 114, 114, 0.7490196078431373)",
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    lineHeight: 19,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 78,
    height: 23,
    left: 12,
    top: -1,
  },
  x1_group55_group54: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 376,
    height: 607,
    left: 0,
    top: 618,
  },
  x1_group55_group54_rectangle92987052f: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "rgb(0,  0,  0)",
    shadowOpacity: 0.3686274509803922,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 375,
    height: 607,
    left: 1,
    top: 0,
  },
  x1_group55_group54_line2aa2d41cf: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 1,
    left: 9.5,
    top: 559.28,
  },
  x1_group55_group54_badBoysForLife5120x5120WillSmithMartinLawrence4k5k2020194687a23e9fb: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 376,
    left: 0,
    top: 156,
  },
  x1_group55_group54_group275aa4a357: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 309,
    height: 52,
    left: 15,
    top: 20,
  },
  x1_group55_group54_group275aa4a357_facultyAtElectricalDeptCoepResearchInBatterytechnology: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 251,
    height: 30,
    left: 58,
    top: 22,
  },
  x1_group55_group54_group275aa4a357_sachinMandale: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 0.7803921568627451)",
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 119,
    height: 22,
    left: 58,
    top: 0,
  },
  x1_group55_group54_group275aa4a357_ellipse1adfd341c: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 45,
    height: 44,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group275aa4a357_professor: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 7,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 30,
    height: 10,
    left: 193,
    top: 8,
  },
  x1_group55_group54_group275aa4a357_radioButton: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4,
    height: 4,
    left: 184,
    top: 11,
  },
  x1_group55_group54_group275aa4a357_radioButton_dot2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4,
    height: 4,
    left: 0,
    top: 0,
  },
  x1_group55_group54_studentsOftenAskMeTheBestPracticesToIncreaseTheBatteryLifetimeInMyResearchIHaveFoundVariousParametersThatAffectseeMore: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 350,
    height: 74,
    left: 14,
    top: 88,
  },
  x1_group55_group54_group1249: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 102,
    height: 20,
    left: 9,
    top: 537,
  },
  x1_group55_group54_group1249_rectangle3522a33c80b: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: 102,
    height: 20,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1249_x51Comments: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(114, 114, 114, 0.7490196078431373)",
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    lineHeight: 19,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 78,
    height: 23,
    left: 12,
    top: -1,
  },
  x1_group55_group54_group1275: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 43,
    left: 9,
    top: 563,
  },
  x1_group55_group54_group1275_rectangle109b0449a0: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_rectangle1106c6ee4b: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 96,
    top: 0,
  },
  x1_group55_group54_group1275_rectangle12835de200: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 196,
    top: 0,
  },
  x1_group55_group54_group1275_rectangle13a286aa27: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 296,
    top: 0,
  },
  x1_group55_group54_group1275_like13c03daf: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19,
    height: 15,
    left: 18,
    top: 22,
  },
  x1_group55_group54_group1275_commentd5d26a6f: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 48,
    height: 15,
    left: 103,
    top: 22,
  },
  x1_group55_group54_group1275_like97c45dc2: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.61,
    height: 14.66,
    left: 20.19,
    top: 7,
  },
  x1_group55_group54_group1275_like97c45dc2_group1260e78dafcb: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 6.2,
  },
  x1_group55_group54_group1275_like97c45dc2_group1260e78dafcb_group12598529c826: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_like97c45dc2_group1260e78dafcb_group12598529c826_path2367a4df154: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_like97c45dc2_group12628b94dd78: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 5.2,
    top: 0,
  },
  x1_group55_group54_group1275_like97c45dc2_group12628b94dd78_group1261552d30dd: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_like97c45dc2_group12628b94dd78_group1261552d30dd_path2377a7e62a2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_chatBubblesWithEllipsis103e7426a: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 118.16,
    top: 7.34,
  },
  x1_group55_group54_group1275_chatBubblesWithEllipsis103e7426a_path227dcc55359: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_bookmarkf40c8189: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 49,
    height: 15,
    left: 202,
    top: 21,
  },
  x1_group55_group54_group1275_bookmarka6ef9917: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 222,
    top: 6.69,
  },
  x1_group55_group54_group1275_bookmarka6ef9917_group1227980c1733: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_bookmarka6ef9917_group1227980c1733_path2167ba619a8: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 11.63,
    height: 17.03,
    left: -1,
    top: -1,
  },
  x1_group55_group54_group1275_shared0abd8d4: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 27,
    height: 15,
    left: 313,
    top: 22,
  },
  x1_group55_group54_group1275_sharefa19656f: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 317.16,
    top: 6.07,
  },
  x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3_group126318e70643: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3_group126318e70643_path23826bcb7ab: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.57,
    height: 12.29,
    left: 4.1,
    top: 0,
  },
  x1_group55_group54_group1275_sharefa19656f_group1264f0eedfd3_group126318e70643_path239f3db6587: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.21,
    height: 13.83,
    left: 0,
    top: 2.62,
  },
  x1_group55_group1276: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 43,
    left: 9,
    top: 1756,
  },
  x1_group55_group1276_rectangle1097d19efd: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_rectangle115944046f: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 96,
    top: 0,
  },
  x1_group55_group1276_rectangle1275405080: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 196,
    top: 0,
  },
  x1_group55_group1276_rectangle138e5c27cb: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 296,
    top: 0,
  },
  x1_group55_group1276_like899dfa8a: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19,
    height: 15,
    left: 18,
    top: 22,
  },
  x1_group55_group1276_comment6425c8c9: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 48,
    height: 15,
    left: 103,
    top: 22,
  },
  x1_group55_group1276_likeb20e2f15: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.61,
    height: 14.66,
    left: 20.19,
    top: 7,
  },
  x1_group55_group1276_likeb20e2f15_group126063cea566: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 6.2,
  },
  x1_group55_group1276_likeb20e2f15_group126063cea566_group12594da0e967: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_likeb20e2f15_group126063cea566_group12594da0e967_path2367a33baec: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_likeb20e2f15_group1262aa8897ef: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 5.2,
    top: 0,
  },
  x1_group55_group1276_likeb20e2f15_group1262aa8897ef_group12610e3ce04b: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_likeb20e2f15_group1262aa8897ef_group12610e3ce04b_path237ccd82887: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_chatBubblesWithEllipsis13d0868e9: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 118.16,
    top: 7.34,
  },
  x1_group55_group1276_chatBubblesWithEllipsis13d0868e9_path227b5566649: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_bookmarkf6fb7c57: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 49,
    height: 15,
    left: 202,
    top: 21,
  },
  x1_group55_group1276_bookmark6a2c4a05: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 222,
    top: 6.69,
  },
  x1_group55_group1276_bookmark6a2c4a05_group1227933b6d19: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_bookmark6a2c4a05_group1227933b6d19_path216986a7b3a: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 11.63,
    height: 17.03,
    left: -1,
    top: -1,
  },
  x1_group55_group1276_share13f91bd2: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 27,
    height: 15,
    left: 313,
    top: 22,
  },
  x1_group55_group1276_share85948cf1: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 317.16,
    top: 6.07,
  },
  x1_group55_group1276_share85948cf1_group126400c74766: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_share85948cf1_group126400c74766_group12633af3df23: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group1276_share85948cf1_group126400c74766_group12633af3df23_path2385c2774f6: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.57,
    height: 12.29,
    left: 4.1,
    top: 0,
  },
  x1_group55_group1276_share85948cf1_group126400c74766_group12633af3df23_path23909b99ab1: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.21,
    height: 13.83,
    left: 0,
    top: 2.62,
  },
  x1_group55_group1279: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 376,
    height: 588,
    left: 0,
    top: 2424,
  },
  x1_group55_group1279_rectangle9ec46ea1c: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "rgb(0,  0,  0)",
    shadowOpacity: 0.3686274509803922,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 375,
    height: 588,
    left: 1,
    top: 0,
  },
  x1_group55_group1279_line2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 1,
    left: 9.5,
    top: 540.22,
  },
  x1_group55_group1279_badBoysForLife5120x5120WillSmithMartinLawrence4k5k202019468: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 376,
    left: 0,
    top: 137,
  },
  x1_group55_group1279_group27: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 161,
    height: 44,
    left: 15,
    top: 20,
  },
  x1_group55_group1279_group27_cirquipNews: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 0.7803921568627451)",
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 103,
    height: 22,
    left: 58,
    top: 11,
  },
  x1_group55_group1279_group27_ellipse17e94f80b: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 45,
    height: 44,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_theProductionDeptBuildingWhichWasInFormationForLast5YearsIsFinallyCompletedhereIsSomeHistoryOfThatBuildingseeMore: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(0, 0, 0, 1)",
    fontSize: 12,
    fontWeight: "700",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 350,
    height: 58,
    left: 14,
    top: 72,
  },
  x1_group55_group1279_group1251: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 102,
    height: 20,
    left: 9,
    top: 518,
  },
  x1_group55_group1279_group1251_rectangle352: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    width: 102,
    height: 20,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1251_x38Comments: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(114, 114, 114, 0.7490196078431373)",
    fontSize: 13,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    lineHeight: 19,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 78,
    height: 23,
    left: 12,
    top: -1,
  },
  x1_group55_group1279_group1277: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 357,
    height: 43,
    left: 9,
    top: 544,
  },
  x1_group55_group1279_group1277_rectangle10f59e50c3: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_rectangle11: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 96,
    top: 0,
  },
  x1_group55_group1279_group1277_rectangle12: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 196,
    top: 0,
  },
  x1_group55_group1279_group1277_rectangle13: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 61,
    height: 43,
    left: 296,
    top: 0,
  },
  x1_group55_group1279_group1277_like6be4fd18: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19,
    height: 15,
    left: 18,
    top: 22,
  },
  x1_group55_group1279_group1277_comment: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 48,
    height: 15,
    left: 103,
    top: 22,
  },
  x1_group55_group1279_group1277_like: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.61,
    height: 14.66,
    left: 20.19,
    top: 6.94,
  },
  x1_group55_group1279_group1277_like_group1260: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 6.2,
  },
  x1_group55_group1279_group1277_like_group1260_group1259: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_like_group1260_group1259_path236: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 4.55,
    height: 8.46,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_like_group1262: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 5.2,
    top: 0,
  },
  x1_group55_group1279_group1277_like_group1262_group1261: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_like_group1262_group1261_path237: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 10.41,
    height: 14.31,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_chatBubblesWithEllipsis1e8f9a8c7: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 118.16,
    top: 7.28,
  },
  x1_group55_group1279_group1277_chatBubblesWithEllipsis1e8f9a8c7_path22791adc97a: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.67,
    height: 14.18,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_bookmark155ff2ce: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 49,
    height: 15,
    left: 202,
    top: 21,
  },
  x1_group55_group1279_group1277_bookmark: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 222,
    top: 6.62,
  },
  x1_group55_group1279_group1277_bookmark_group1227: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 9.63,
    height: 15.03,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_bookmark_group1227_path216: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 11.63,
    height: 17.03,
    left: -1,
    top: -1,
  },
  x1_group55_group1279_group1277_sharec3c1f81f: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(88, 88, 88, 1)",
    fontSize: 11,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 27,
    height: 15,
    left: 313,
    top: 22,
  },
  x1_group55_group1279_group1277_share: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 317.16,
    top: 6,
  },
  x1_group55_group1279_group1277_share_group1264: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_share_group1264_group1263: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 19.67,
    height: 16.45,
    left: 0,
    top: 0,
  },
  x1_group55_group1279_group1277_share_group1264_group1263_path238: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 15.57,
    height: 12.29,
    left: 4.1,
    top: 0,
  },
  x1_group55_group1279_group1277_share_group1264_group1263_path239: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 17.21,
    height: 13.83,
    left: 0,
    top: 2.62,
  },
  x1_group52: {
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 365,
    height: 56,
    left: 5,
    top: 792,
  },
  x1_group52_inputLight: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 365,
    height: 56,
    left: 0,
    top: 0,
  },
  x1_group52_inputLight_bg: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 365,
    height: 56,
    left: 0,
    top: 0,
  },
  x1_group52_inputLight_group28: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 159,
    height: 21,
    left: 13,
    top: 17,
  },
  x1_group52_inputLight_group28_typeYourMessage: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(216, 216, 216, 1)",
    fontSize: 15,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "SF Pro Text",
    textAlign: "left",
    lineHeight: 22,
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 127,
    height: 27,
    left: 32,
    top: -1,
  },
  x1_group52_inputLight_group28_smile: {
    opacity: 0.6000000238418579,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    width: 22,
    height: 22,
    left: -1,
    top: 0,
  },
  x1_group52_inputLight_group28_smile_ellipse4: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 24,
    height: 24,
    left: -2,
    top: -2,
  },
  x1_group52_inputLight_group28_smile_path4: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 12,
    height: 6,
    left: 4,
    top: 10,
  },
  x1_group52_inputLight_group28_smile_line5: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 2.01,
    height: 2,
    left: 6.27,
    top: 6,
  },
  x1_group52_inputLight_group28_smile_line6: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 2.01,
    height: 2,
    left: 11.73,
    top: 6,
  },
  x1_group52_attachClipboardButton: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 24.5,
    height: 22.29,
    left: 323.18,
    top: 17.26,
  },
  x1_group52_attachClipboardButton_group48: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 24.5,
    height: 22.29,
    left: 0,
    top: 0,
  },
  x1_group52_attachClipboardButton_group48_path122: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 24.46,
    height: 22.25,
    left: 0.02,
    top: 0.02,
  },
  x1_group52_attachClipboardButton_group48_path123: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 24.5,
    height: 22.29,
    left: 0,
    top: 0,
  },
  x1_ios111AutocorrectBug: {
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 249,
    left: 0,
    top: 848,
  },
  x1_group5: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 375,
    height: 109,
    left: 0,
    top: 703,
  },
  x1_group5_rectangle3: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 89,
    left: 0,
    top: 20,
  },
  x1_group5_ellipse1: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    shadowColor: "rgb(54,  181,  165)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 53,
    height: 53,
    left: 28,
    top: 40,
  },
  x1_group5_ellipse2: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    shadowColor: "rgb(54,  181,  165)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 53,
    height: 53,
    left: 297,
    top: 40,
  },
  x1_group5_group1252: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 80,
    height: 80,
    left: 148,
    top: 0,
  },
  x1_group5_group1252_ellipse3: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    shadowColor: "rgb(54,  181,  165)",
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 80,
    height: 80,
    left: 0,
    top: 0,
  },
  x1_group5_group1252_plus: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 58.73,
    height: 58.73,
    left: 10.51,
    top: 11.1,
  },
  x1_group5_home: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 30.59,
    height: 30.59,
    left: 39.68,
    top: 49.7,
  },
  x1_group5_chatBubblesWithEllipsis1: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 33.8,
    height: 27.12,
    left: 307.1,
    top: 52.87,
  },
  x1_group5_chatBubblesWithEllipsis1_path227: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 33.8,
    height: 27.12,
    left: 0,
    top: 0,
  },
  x1_path1d13131c7: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 375,
    height: 80,
    left: 0,
    top: 0,
  },
  x1_path1: {
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 375,
    height: 100,
    left: 0,
    top: -95,
  },
  x1_rectangle2: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
    shadowColor: "rgb(54,  181,  165)",
    shadowOpacity: 0.8509803921568627,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 337,
    height: 37,
    left: 19,
    top: 16,
  },
  x1_search: {
    opacity: 1,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0)",
    color: "rgba(112, 112, 112, 1)",
    fontSize: 17,
    fontWeight: "400",
    fontStyle: "normal",
    fontFamily: "Segoe UI",
    textAlign: "left",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 50,
    height: 22,
    left: 63,
    top: 23,
  },
  x1_menu: {
    opacity: 1,
    position: "absolute",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    width: 22,
    height: 17,
    left: 27,
    top: 26,
  },
  x1_rectangle14: {
    position: "absolute",
    backgroundColor: "transparent",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 375,
    height: 3152,
    left: 0,
    top: 0,
  },
  x1_rectangle346: {
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    width: 295,
    height: 1022,
    left: -290,
    top: 0,
  },
  x1_rectangle347: {
    position: "absolute",
    backgroundColor: "rgba(246, 246, 246, 1)",
    marginTop: 0,
    marginRight: 0,
    marginBottom: 0,
    marginLeft: 0,
    paddingTop: 0,
    paddingRight: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    shadowColor: "rgb(0,  0,  0)",
    shadowOpacity: 0.07058823529411765,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 6,
    width: 295,
    height: 93,
    left: -290,
    top: 0,
  },
});
