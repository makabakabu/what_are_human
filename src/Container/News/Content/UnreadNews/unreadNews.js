import React from 'react';
import { FlatList } from 'react-native';
import { connect } from 'react-redux';
import uuidv4 from 'uuid';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import Section from './section';

const UnreadNews = ({ news, infoList }) => (
    <FlatList
      data={infoList.reduce((sectionArray, info) =>
                            sectionArray.concat(news.get(info)
                                .filter(value => !value.get('read'))
                                    .map((value, key) => ({ key, value, viewMode: info }))
                                        .valueSeq()
                                            .toArray()), [])}
      renderItem={({ item }) => <Section key={uuidv4()} text={item.value.get('text')} newsId={item.key} viewMode={item.viewMode} />}
    />
);

UnreadNews.propTypes = {
    news: ImmutablePropTypes.map.isRequired,
    infoList: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
    news: state.get('news'),
    infoList: ['转发', '评论', '回复', '点赞', '收藏', '系统消息'],
});

export default connect(mapStateToProps)(UnreadNews);
