import React from 'react'
import { notification, Space } from 'antd';


function Notification({notify, todo}) {
    const openNotification = (placement, todo) => {
        notification.info({
          message: `Notification ${todo.context}`,
          description:
            'You have deadline in 30 minutes',
          placement,
        });
    }

    return (
        <div>
            <Space>
              {notify? openNotification('bottomRight', todo) : ''}
                {/* <Button type="primary" onClick={() => openNotification('bottomRight')}>
                    Button
                </Button> */}
            </Space>
        </div>
    )
}

export default Notification
