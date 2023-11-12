"use client"
import { PropertySafetyOutlined } from '@ant-design/icons';
import { Tabs, TabsProps } from 'antd';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

const { TabPane } = Tabs;

export const DynamicTab = (props) => {
  const t = useTranslations();
  const [defaultActiveKey, setDefaultActiveKey] = useState(
    props.tabDetail[0].key
  );
  const router = useRouter();
  const param = useParams();
  const firstArrayKey = props.tabDetail[0].key;

  useEffect(() => {
    const foundParam = props.tabDetail.some((item) => item.key === param.key);
    if (foundParam) {
      setDefaultActiveKey(param.key);
    } else {
      const fallbackRoute = props.masterRoute.replace(':key', firstArrayKey);
      router.push(fallbackRoute);
    }
  }, [firstArrayKey, param.key, props.masterRoute, props.tabDetail, router]);

  return (
    <div>
      <Tabs
        activeKey={defaultActiveKey ? defaultActiveKey : firstArrayKey}
        onChange={(key) => {
          // console.log(key)
          const route = props.masterRoute.replace(':key', key);
          router.push(route);
        }}
        {...props.antdTabProps}
      >
        {props.tabDetail.map((tab) => {
          return (
            <TabPane
              tab={
                <span className="flex items-center justify-start">
                  <b>{tab.prefixTitleIcon ? tab.prefixTitleIcon : null}</b>
                  <span style={{ marginLeft: 2 }}>{t(tab.title)}</span>
                </span>
              }
              key={tab.key}
            >
              {tab.children}
            </TabPane>
          );
        })}
      </Tabs>
    </div>
  );
};
