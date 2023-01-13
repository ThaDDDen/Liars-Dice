import * as React from "react";
import { View } from "react-native";
import { useTheme } from "react-native-paper";
import Svg, { G, Path, SvgProps } from "react-native-svg";

const GameSettingsHeader = (props: SvgProps) => {
  const { colors } = useTheme();
  return (
    <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 30 }}>
      <Svg width={243.821} height={92.979} viewBox="0 0 64.511 24.601" xmlns="http://www.w3.org/2000/svg" {...props}>
        <G aria-label="Game" style={{ fill: colors.primaryContainer }}>
          <Path
            d="M47.9 53.119q.006.162.006.437 0 .19.028.394.127.007 1.134-.007.697-.007.972.077-.268 1.24-1.12 1.916-.908.725-2.267.606.007-6.17.035-6.803 1.148-.05 2.07.514.388-.317.521-.655-1.197-.888-2.795-.76-2.022.161-3.036 1.323-.986 1.12-.972 3.099.007 1.711 1.064 2.894 1.042 1.17 2.627 1.282 2.24.162 3.507-.979 1.289-1.162 1.225-3.338zm1.964 3.697q-.803.782-2.45.965-1.656.183-2.832-.38-.493-.233-1-.69-1.387-1.24-1.43-3.522-.035-2.267 1.254-3.556 1.05-1.05 3.148-1.141 2.183-.099 3.176 1.035-.084.211-.83 1.176-1.31-.612-1.867-.62-.014.367-.035 6.142.979-.007 1.662-.543.634-.486.93-1.352-.353-.056-1.036-.035-.753.014-.937 0-.035-.225-.063-.76-.021-.522-.07-.761h1.943q1.177.007 1.817-.035.148 2.591-1.38 4.077zm-.824-2.14q-.493.929-1.627 1.175-.007-.028-.07-1.176zm2.55-2.318q-.67.043-2.163.036-1.464-.007-2.084.035.028-1.754.07-1.937.402.063.845.296l.367.204q.225.127.38.19 1.07-1.493 1.169-1.824-1.592-1.33-3.45-1.282-2.276.064-3.586 1.36-1.246 1.232-1.352 3.303-.035.648 0 1.07.134 1.789 1.402 3.021 1.274 1.233 3.084 1.331 2.684.148 4.113-1.38 1.458-1.556 1.204-4.423zM56.463 52.464q-.099.021-.352 0 .021-.218-.007-.613l-.05-.648q-.014-.746.374-.894.05.373.035 1.056-.007.902 0 1.099zm.352.387q.092-1.394 0-2.894-.986-.141-1.113.901-.035.345 0 .986.057.845.057 1.007zm-1.408.352q.063-.408-.07-1.486-.114-.936.07-1.408.316-.817 1.725-.74.14 1.19.035 3.634zm.07-4.373q-.76.077-1.578.585-.852.528-1 1.07v6.916q1.205.098 2.472 0 0-.24-.028-1.754-.02-1.084.064-1.634.155.007.915-.007.57-.007.88.043V57.4q.564.127 1.092 0 .099-4.233 0-8.571-.486.07-1.401.014-.98-.063-1.416-.014zm3.17 8.923q-1.388.063-1.797-.035V54.4q-.169-.05-.528-.043-.472.014-.563.007-.092.543-.057 1.67.043 1.197-.014 1.718-1.514.084-3.14 0v-3.634q0-.36-.05-1.887-.035-1.064.014-1.606.042-.409.409-.86.352-.415.824-.69 1.049-.598 2.084-.598 2.704-.007 2.606 0 .26.282.282.901 0 .197-.014.564-.022.415-.022.577 0 5.972-.035 7.233zm-.106-9.662q-.55.07-1.515.02-1.049-.056-1.514-.02-1.035.077-2.07.753-1.07.704-1.247 1.5-.035.162-.035 1.98v5.781q2.085.14 3.916 0 .014-.352-.007-1.458-.014-1.084.007-1.542v-.134q-.007-.063 0-.084.007-.078.105-.134.043-.028.162-.007.099.02.12-.028v3.352q1.26.169 2.57 0 .036-1.74.036-7.338v-1.62q-.078-.81-.528-1.021zM67.921 48.964q-.387.162-.81.535l-.33.31q-.198.197-.303.282-.015-.099.007-.676.014-.423-.078-.592-.507.091-1.725.007-1.177-.085-1.698.028-1.169.26-2.042 1.768-.599 1.021-.62 3.056-.007.514.035 1.817.036 1.212.015 1.895.485.112.887 0v-2.965q0-2.36.14-2.782.233-.704.853-1.211.584-.48 1.366-.662.05 1.345.042 3.83-.014 3.29-.007 3.79 1.36.105 2.86 0-.014-.402 0-1.296.014-.852 0-1.317-.092-2.303 0-2.711.24-1.057 1.02-1.761.585-.535 1.339-.57v3.88q0 2.31.035 3.775 1.36.112 2.79 0 .07-6.212 0-8.571-.543.056-2.071-.028-1.148-.064-1.705.169zm4.127 8.782q-1.88.084-3.493 0-.014-.641-.035-7.585-.641.254-1.113.838-.521.648-.577 1.423-.057.718.014 2.62.07 1.824-.014 2.704-1.613.091-3.493 0-.05-1.26-.043-3.606.014-3.232.007-3.866-1.19.422-1.55 1.479-.267.767-.175 2.824.113 2.436.035 3.134-.775.176-1.592 0 .022-.712-.02-2.022-.036-1.38-.029-1.957.021-2.205.655-3.317.845-1.515 2.183-1.874.585-.155 1.514-.098 1.261.084 1.592.063.578-.028.704.028.268.12.212.676.162-.07.57-.345.352-.24.627-.324.591-.183 1.901-.098 1.543.098 2.155.028 0 7.085-.035 9.275zm.388-9.627-2.937-.043q-1.641-.02-2.352.5-.177-.45-.853-.485-.197-.007-.648.014-.457.02-.69.014-1.288-.057-2.028.07-.86.148-1.493.599-.57.408-1.17 1.486-.654 1.183-.668 3.556-.007.606.042 2.085.05 1.366.028 2.113 1.127.295 2.331 0v-3.071q0-2.197.043-2.542.148-1.198.873-1.507.021 6.683.035 7.19 2.134.148 4.268 0 0-.218.035-1.408.028-.916 0-1.522-.091-1.95 0-2.676.17-1.268.916-1.69-.043 5.437.035 7.296 2.155.148 4.197 0 .05-1.894.043-4.965-.015-4.127-.007-5.014zM76.168 56.633q.007-.197 0-1.415-.007-.88.035-1.29h1.233q.091-.408 0-.81-1.317-.048-1.268-.034V50.45q.127-.472.887-.676.965-.254 1.155-.416v-.528q-.324.028-.908-.007-.627-.035-.887-.028-.93.042-1.733.528-.866.528-.937 1.232-.105 1.057-.028 3.374.099 2.634.064 3.514h4.676q.042-.113.035-.366-.007-.352 0-.409-2 .029-2.324-.035zm2.599 1.155q-.48 0-2.69.007-1.655.007-2.648-.042-.036-.718-.036-3.543v-3.725q.106-.852 1.036-1.423.83-.507 1.88-.584.373-.021.979-.014.866.014.993.014.225.042.267.38.007.078.015.31.007.197.028.296-.176.352-1.021.542-.86.19-1.05.514v2.247q.423.035 1.233-.035.148.83 0 1.514-.458.056-1.198.035-.049.345-.042.979.014.845.007 1.021.402.077 2.352 0-.007.134-.02.732-.008.451-.085.775zm-1.86-3.127q.212.014 1.163-.105.295-1.099-.036-2.212-.218.021-.584.042-.38.015-.542.029v-1.79q.204-.105.577-.21.535-.148.606-.17.697-.232.852-.71.07-.733-.155-1.085-.24-.367-.86-.36-.239.008-.936-.014-.55-.014-.894.015-.986.084-1.803.591-.838.514-1.148 1.275-.197.486-.19 1.45 0 .268.028.839.021.535.021.802 0 2.402.035 5.057 1.683.12 6.043.035.063-.218.176-2.246-2.141.063-2.352.035z"
            transform="translate(-41.769 -48.072)"
          />
        </G>
        <G aria-label="Settings" style={{ fill: colors.primaryContainer }}>
          <Path d="M6.443 19.368q-.4-.176-1.436-.085-1.106.092-1.479-.014-.035-1.415.07-1.979.19-.936.86-1.14.155-.05.493-.014.387.042.598.014.472-.655.55-.895-3.212-.288-4.451 1.48-.352.5-.57 1.196-.219.712-.184 1.268.036.704.444.936.331.198 1.127.162 1.042-.042 1.718.036-.042.345.035 1.056.064.591-.035.894-.225.676-1.12.676-.781-.007-1.415-.436-.606.436-.655.655.542.746 2.26.718 1.74-.035 2.719-1.183 1-1.176.781-3.07-.063-.029-.155-.134-.084-.106-.155-.141zm-.274 3.704q-.472.55-1.268.866-.767.31-1.62.331-.88.021-1.598-.26-.782-.303-1.204-.902.5-.556 1.098-.993.578.366 1.205.48.852.154 1.056-.416.091-.26.035-.712-.07-.528-.035-.795-.38-.064-1.556-.007-.874.049-1.219-.233-.507-.401-.514-1.303-.007-.725.289-1.563.303-.866.775-1.38.93-1.021 2.155-1.232.591-.106 1.506-.057.993.057 1.338.021-.225.803-.887 1.578-.232.042-.634-.007-.373-.042-.535.007-.52.148-.648.93-.063.45 0 1.5.303.09 1.331.013.98-.07 1.373.092.55.225.55 1.267 0 1.627-.993 2.775zm1.267-3.669q-.042-.127-.253-.373-.233-.275-.394-.345-.402-.162-1.176-.113-.986.056-1.367.007.007-.127.007-.556-.007-.345.014-.535.064-.557.43-.655.14-.036.57.02.423.057.662-.02.796-.902 1.233-2.331-.416.056-1.76.028-1.22-.021-1.804.113-1.436.33-2.359 1.478Q.324 17.255.204 18.82q-.091 1.26.585 1.852.408.359 1.14.366.177 0 .712-.035.493-.029.824-.022-.007.064.063.648.042.374-.099.521-.295.296-.992-.02-.17-.071-.529-.268-.295-.162-.401-.197Q.444 22.572 0 23.072q.148.14.394.479.212.288.36.408.922.754 2.95.62 1.62-.106 2.683-1.26 1.007-1.092 1.12-2.648.063-.902-.07-1.268zM11.232 23.058q.007-.197 0-1.416-.007-.88.035-1.288H12.5q.091-.409 0-.81-1.317-.05-1.268-.035v-2.634q.127-.472.887-.676.965-.254 1.155-.416v-.528q-.324.029-.908-.007-.627-.035-.888-.028-.93.042-1.732.528-.866.528-.936 1.233-.106 1.056-.029 3.373.099 2.633.064 3.514h4.676q.042-.113.035-.366-.007-.353 0-.409-2 .028-2.324-.035zm2.599 1.155q-.48 0-2.69.007-1.655.007-2.648-.042-.036-.719-.036-3.543V16.91q.106-.852 1.036-1.422.83-.507 1.88-.585.373-.02.979-.014.866.014.993.014.225.042.267.38.007.078.014.31.007.197.028.296-.176.352-1.02.542-.86.19-1.05.514v2.247q.423.035 1.232-.035.148.83 0 1.514-.457.056-1.197.035-.049.345-.042.979.014.845.007 1.02.401.078 2.352 0-.007.135-.021.733-.007.45-.085.775zm-1.86-3.127q.212.014 1.162-.106.296-1.098-.035-2.21-.218.02-.584.042-.38.014-.543.028V17.05q.205-.106.578-.211.535-.148.605-.17.698-.232.853-.71.07-.733-.155-1.085-.24-.366-.86-.36-.239.008-.936-.013-.55-.014-.894.014-.986.084-1.803.591-.838.515-1.148 1.275-.197.486-.19 1.45 0 .268.028.839.021.535.021.802 0 2.402.035 5.057 1.683.12 6.042.035.064-.218.176-2.247-2.14.064-2.352.036zM15.845 15.305q-.022.62.035.81.169.006.95-.008.592-.007.909.043.007.648 0 3.816-.014 2.423.035 3.86 2.021.084 2.873-.036.007-.69 0-3.859-.014-2.373.035-3.816h1.19q.113-.36 0-.81zm6.38 1.126q-.17.029-1.19.036-.05 1.436-.043 3.795.014 3.155.007 3.845-.704.127-3.612.07v-7.675q-.268-.05-.909-.035-.648.014-.908-.036-.056-.24-.085-.725-.028-.556-.056-.746.57-.015 3.338.007 2.05.014 3.246-.078h.07q.226.303.142 1.542zm.035-1.93q-1.233.135-3.535.114-3.275-.022-3.754-.007.078.323.134 1.091.063.746.148 1.077.69.099 1.789.07v7.712q.422-.014 1.126.014.937.028 1.148.028 1.345.014 2.035-.253.05-1.395.036-3.845-.015-2.965 0-3.655.239.021.584-.021.408-.043.57-.05.31-1.669-.281-2.274zM24.112 15.305q-.021.62.035.81.169.006.95-.008.592-.007.91.043.006.648 0 3.816-.015 2.423.034 3.86 2.021.084 2.873-.036.007-.69 0-3.859-.014-2.373.036-3.816h1.19q.112-.36 0-.81zm6.38 1.126q-.17.029-1.19.036-.05 1.436-.042 3.795.014 3.155.007 3.845-.705.127-3.613.07v-7.675q-.268-.05-.908-.035-.648.014-.909-.036-.056-.24-.084-.725-.029-.556-.057-.746.57-.015 3.338.007 2.05.014 3.247-.078h.07q.225.303.14 1.542zm.035-1.93q-1.232.135-3.535.114-3.275-.022-3.753-.007.077.323.133 1.091.064.746.148 1.077.69.099 1.789.07v7.712q.422-.014 1.127.014.936.028 1.148.028 1.345.014 2.035-.253.049-1.395.035-3.845-.014-2.965 0-3.655.24.021.584-.021.409-.043.57-.05.31-1.669-.28-2.274zM36.456 23.05q.007-.626-.014-3.562-.014-2.19.085-3.472 1.02-.014 1.162-.035-.028-.705-.042-.74-1.015.05-2.634.043-2.296-.015-2.711-.007v.704l1.302.035q-.042 1.007-.007 3.634.029 2.316-.063 3.471h-1.232q-.092.254 0 .74h5.345q.098-.451 0-.775-1.057.028-1.19-.035zm-4.471 1.163q-.07-.36-.07-1.444h1.267q.091-1.267.07-3.19-.035-2.965-.035-3.211-1-.014-1.197-.07-.035-.12-.07-1.374h2.985q1.81.007 2.852-.035.247.141.275.578.007.12 0 .394 0 .26.007.401-.627.134-1.225.106-.05 1.12-.043 3.12.007 2.697.007 3.246.141.035 1.12-.035.233.577.035 1.514zm5.21-7.458q.416-.007 1.297-.246-.029-.218-.05-.67-.02-.422-.049-.612-.106-.634-.606-.725.05.007-.345.035-.802.056-2.894.021-2.14-.028-2.95.014-.12 1.296.105 2.078.183.028.613.063.373.028.549.077-.007.5.007 2.817.007 1.733-.042 2.775-1.338.042-1.303.035.07 1.803.176 2.183.148-.007 3.366 0 2.028 0 3.246-.035.19-1.394-.07-2.254-.183 0-.528.036-.338.035-.521.035zM45.287 15.431q-.183.036-.535.022-.366-.015-.493.007v3.21q-1.352-1.344-2.387-2.45-.057-.056-.183-.211l-.205-.247q-.26-.288-.436-.33-.19-.05-.578.006-.373.05-.549-.007v7.979q.162.035.542.035.395-.007.55.028v-4.239q.669.64 2.105 2.24 1.324 1.464 2.134 2.196.042-1.52.035-4.063-.007-3.704 0-4.176zm.26 8.704q-.443-.07-.816-.422.035.035-.641-.704-1.993-2.176-2.746-2.909v3.838q-.233-.127-.852-.155-.677-.028-.902-.112v-8.704q.282.162.831.126.606-.035.824.036.106.035.697.662 1.366 1.443 1.986 2.056v-2.718q1.521-.099 1.69-.162-.007.577.007 4.626.007 2.768-.077 4.542zm.43-9.633q-.528.24-2.415.296v2.19q-.183-.212-.521-.55-.38-.373-.535-.549-.909-.979-1.092-1.056.021.007-1.099-.064-.183-.014-.542-.126-.394-.127-.514-.141-.042 1.81-.035 4.697.007 4.07 0 4.74.317.119 1.246.21.845.078 1.205.282V20.96q.401.352 1.556 1.655.965 1.085 1.127 1.233.718.64 1.556.753.035-.915.063-10.098zM52.745 19.544q.007.162.007.437 0 .19.028.394.126.007 1.133-.007.698-.007.972.077-.267 1.24-1.12 1.916-.908.725-2.267.605.007-6.168.035-6.802 1.148-.05 2.07.514.388-.317.522-.655-1.197-.887-2.796-.76-2.021.161-3.035 1.323-.986 1.12-.972 3.099.007 1.711 1.064 2.894 1.042 1.169 2.626 1.282 2.24.162 3.507-.98 1.289-1.161 1.225-3.337zm1.964 3.697q-.803.782-2.45.965-1.655.183-2.831-.38-.493-.233-1-.69-1.387-1.24-1.43-3.522-.035-2.267 1.254-3.556 1.049-1.05 3.148-1.14 2.183-.1 3.175 1.034-.084.212-.83 1.177-1.31-.613-1.867-.62-.014.366-.035 6.14.979-.007 1.662-.542.634-.486.93-1.352-.352-.056-1.036-.035-.753.014-.936 0-.035-.225-.063-.76-.022-.522-.07-.761h1.943q1.176.007 1.817-.035.147 2.591-1.38 4.077zm-.824-2.14q-.493.929-1.626 1.175-.007-.028-.07-1.176zm2.55-2.318q-.67.043-2.162.036-1.465-.007-2.085.035.028-1.754.07-1.937.402.064.846.296l.366.204q.225.127.38.19 1.07-1.493 1.17-1.824-1.592-1.33-3.451-1.281-2.275.063-3.585 1.359-1.246 1.232-1.352 3.303-.035.648 0 1.07.134 1.789 1.401 3.021 1.275 1.232 3.085 1.331 2.683.148 4.112-1.38 1.458-1.557 1.205-4.423zM63.427 19.368q-.401-.176-1.436-.085-1.106.092-1.48-.014-.034-1.415.071-1.979.19-.936.86-1.14.154-.05.492-.014.388.042.599.014.472-.655.55-.895-3.212-.288-4.451 1.48-.352.5-.57 1.196-.22.712-.184 1.268.035.704.444.936.33.198 1.127.162 1.042-.042 1.718.036-.043.345.035 1.056.063.591-.035.894-.226.676-1.12.676-.782-.007-1.415-.436-.606.436-.655.655.542.746 2.26.718 1.74-.035 2.718-1.183 1-1.176.782-3.07-.063-.029-.155-.134-.084-.106-.155-.141zm-.274 3.704q-.472.55-1.268.866-.768.31-1.62.331-.88.021-1.598-.26-.782-.303-1.204-.902.5-.556 1.098-.993.578.366 1.204.48.853.154 1.057-.416.091-.26.035-.712-.07-.528-.035-.795-.38-.064-1.557-.007-.873.049-1.218-.233-.507-.401-.514-1.303-.007-.725.289-1.563.303-.866.774-1.38.93-1.021 2.155-1.232.592-.106 1.507-.057.993.057 1.338.021-.225.803-.887 1.578-.232.042-.634-.007-.373-.042-.535.007-.521.148-.648.93-.063.45 0 1.5.303.09 1.331.013.979-.07 1.373.092.55.225.55 1.267 0 1.627-.993 2.775zm1.267-3.669q-.042-.127-.253-.373-.233-.275-.395-.345-.401-.162-1.176-.113-.986.056-1.366.007.007-.127.007-.556-.007-.345.014-.535.064-.557.43-.655.14-.036.57.02.423.057.662-.02.796-.902 1.233-2.331-.416.056-1.761.028-1.218-.021-1.803.113-1.436.33-2.359 1.478-.915 1.134-1.035 2.698-.092 1.26.585 1.852.408.359 1.14.366.176 0 .712-.035.493-.029.823-.022-.007.064.064.648.042.374-.099.521-.295.296-.993-.02-.169-.071-.528-.268-.296-.162-.401-.197-1.064.908-1.507 1.408.148.14.394.479.211.288.36.408.922.754 2.95.62 1.62-.106 2.683-1.26 1.007-1.092 1.12-2.648.063-.902-.07-1.268z" />
        </G>
      </Svg>
    </View>
  );
};

export default GameSettingsHeader;
