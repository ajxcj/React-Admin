import React, { useEffect, useState } from 'react'
import { Space, Table, Button, Image, Modal } from 'antd';
import { bannerGet, bannerDel } from '@/api/cake'
import qs from 'query-string'
import { connect } from 'react-redux';

const CakeBannerList = (props) => {
    let [data, setData] = useState([])
    let [visible, setVisible] = useState(false)//控制弹窗
    let [id, setId] = useState('')//纪录待删除数据的ID
    let [idx, setIdx] = useState(-1)//纪录待删除数据的下标
    let [page, setPage] = useState(0)//纪录页码对应的数量

    const columns = [
        {
            title: 'ID',
            dataIndex: 'objectId',
            key: 'objectId',
            render: (text) => <a>{text}</a>,
        },
        {
            title: '活动名称',
            dataIndex: 'bname',
            key: 'bname',
        },
        {
            title: '活动图片',
            dataIndex: 'imgurl',
            key: 'imgurl',
            render: (text, record, index) => {
                //text是当前格的数据
                //record是当前行的数据
                //index是行的序号
                return <Image src={text} height={40} />
            }
        },

        {
            title: '操作',
            key: 'action',
            render: (_, record, index) => (
                <Space size="middle">
                    <Button type='primary' size='small' onClick={() => {
                        props.history.push({
                            pathname: '/admin/banner/edit',
                            search: qs.stringify(record)
                        })
                    }}>
                        编辑
                    </Button>
                    <Button
                        onClick={() => { handleDle(record, index) }}
                        type='secondary'
                        danger
                        size='small'
                        disabled={props.user.userInfo.rolecode == 'normal'}
                    >
                        删除
                    </Button>
                </Space>
            ),
        },
    ];

    useEffect(() => {
        bannerGet().then(res => {
            // console.log(res);
            setData(res.data.results);
        })
    }, [])
    let handleModal = (bool, type) => {
        setVisible(bool)
        // console.log('真删除', id, idx);
        if (type === 1) {
            idx += page
            bannerDel(id).then(res => {
                data.splice(idx, 1);
                setData([...data])
            })

        }
    }
    let handleDle = ({ objectId }, index) => {//删除按钮
        setId(objectId)
        setIdx(index)
        setVisible(true)
    }
    return (
        <>
            <Table
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
                rowKey='objectId'
                onChange={({ current, pageSize }) => {
                    let n = (current - 1) * pageSize
                    setPage(n)
                }} />;
            <Modal
                title="确定要删除吗"
                visible={visible}
                onOk={() => { handleModal(false, 1) }}
                onCancel={() => { handleModal(false, 2) }}
                okText="确认"
                cancelText="取消"
            >
                <p>删除后数据将无法找回</p>
            </Modal>
        </>
    )
};

export default connect(({ user }) => ({ user }))(CakeBannerList);