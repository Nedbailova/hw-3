import Text from 'components/Text';
import styles from './ContributorInfo.module.scss';
import React from 'react';

interface InfoItem {
  label: string;
  value: string | number;
  isLink?: boolean;
}

const ContributorInfo = ({ items }: { items: InfoItem[] }) => (
  <div className={styles.additional_info}>
    {items.map((item) => (
      <div key={item.label} className={styles.info_item}>
        <Text view="p-16" weight="bold">
          {item.label}
        </Text>
        {item.isLink ? (
          <a href={item.value as string}>
            <Text view="p-16" color="blue">
              {item.value}
            </Text>
          </a>
        ) : (
          <Text view="p-16">{item.value}</Text>
        )}
      </div>
    ))}
  </div>
);

export default React.memo(ContributorInfo);
