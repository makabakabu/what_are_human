import { Map, OrderedMap } from 'immutable';
import randomString from 'random-string';

const initState = Map({
    viewMode: 'academy',
    menu: Map({
        viewMode: 'signIn',
        visibility: false,
        title: '',
        backTo: '',
        signIn: Map({
            phoneNumber: '12692307692',
            password: 'bengongbu',
            typedVertificationCode: '',
            vertificationCode: randomString({ length: 4 }),
        }),
        register: Map({
            userName: '',
            phoneNumber: '',
            password: '',
            rePassword: '',
            gender: '', // true表示女性， false表示女性
            vertificationCode: '',
            checkbox: true,
        }),
    }),
    share: Map({
        source: '',
        academy: Map({
            text: '',
            time: '',
            location: Map({
                order: '1',
            }),
        }),
        notes: Map({
            text: '',
            time: '',
            location: Map({
                viewMode: 'academyNotes', // academyNotes, winkThought
                notesId: '',
            }),
        }),
        plaza: Map({
            text: '',
            time: '',
            location: Map({
                plazaName: 'tiananmen',
                speechId: '',
            }),
        }),
    }),
    academy: Map({
        viewMode: 'main', // main 或者 section
        order: '3',
        title: '学院',
        content: OrderedMap({
            1: Map({
                viewMode: 'main', // main 或者 operation
                text: '人是动物，人仅仅是动物吗？第一个“动物”表达为生物学中的“类群”的概念，人无法脱离“动物”这个大类，人类依然属于动物类；第二个“动物”单指除了人之外的动物，也可以指除了人性之外的动物性。人在发展的过程中有意识地将自己从动物及动物性中抽离出来，这种抽离是人一切价值判断建构的原点，这种抽离使人义无反顾地背叛了他自身的类属，并以此建构了异于动物的符号意义系统。',
                operation: Map({
                    viewMode: '',
                    share: Map({
                        number: 132,
                    }),
                    like: Map({
                        number: 76,
                        clicked: false,
                    }),
                    revise: '人是动物，人仅仅是动物吗？第一个“动物”表达为生物学中的“类群”的概念，人无法脱离“动物”这个大类，人类依然属于动物类；第二个“动物”单指除了人之外的动物，也可以指除了人性之外的动物性。人在发展的过程中有意识地将自己从动物及动物性中抽离出来，这种抽离是人一切价值判断建构的原点，这种抽离使人义无反顾地背叛了他自身的类属，并以此建构了异于动物的符号意义系统。',
                    notes: Map({
                        title: '',
                        text: '',
                    }),
                    comment: Map({
                        location: Map({
                            viewMode: 'comment',
                            text: '',
                            commentId: '',
                            recommentId: '',
                        }),
                        content: OrderedMap({
                            asdfasdf: Map({
                                userName: '本宫不死你终究是妾',
                                gender: 'male',
                                text: '您说得太好啦！',
                                time: '',
                                visibility: false,
                                like: Map({
                                    number: 32,
                                    clicked: false,
                                }),
                                recomment: OrderedMap({
                                    asdfasdfadfsdf: Map({
                                        userName: '我就是扯淡',
                                        gender: 'female',
                                        to: '本宫不死你终究是妾',
                                        text: 'asdfsadf',
                                        time: '',
                                    }),
                                    asdfasdfsadsadf: Map({
                                        userName: '扯淡就是我',
                                        gender: 'female',
                                        to: '本宫不死你终究',
                                        text: 'asdfsadf',
                                        time: '',
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            }),
            2: Map({
                viewMode: 'main', // main 或者 operation
                text: '人是高等动物。人凭什么高等？把自己凌驾于其他生物之上？这里面的“合法性”是谁赋予的？为人类异于动物的独特性授权正名是所有文化需要直面并解决的第一个问题，同时这也是文化的首要功能。“天道”和“自然法”就是这种功能的文化解决方案，它们刻意模糊了地球上的资源属于地球所有生物这一事实，将人抬上了统领万物的王位，“天道”和“自然法”是地球生物中既得利益者为了维护自己的利益自我捏造的授权书。',
                operation: Map({
                    viewMode: '',
                    share: Map({
                        number: 135,
                    }),
                    like: Map({
                        number: 98,
                        clicked: false,
                    }),
                    revise: '人是高等动物。人凭什么高等？把自己凌驾于其他生物之上？这里面的“合法性”是谁赋予的？为人类异于动物的独特性授权正名是所有文化需要直面并解决的第一个问题，同时这也是文化的首要功能。“天道”和“自然法”就是这种功能的文化解决方案，它们刻意模糊了地球上的资源属于地球所有生物这一事实，将人抬上了统领万物的王位，“天道”和“自然法”是地球生物中既得利益者为了维护自己的利益自我捏造的授权书。',
                    notes: Map({
                        title: '',
                        text: '',
                    }),
                    comment: Map({
                        location: Map({
                            viewMode: 'comment',
                            text: '',
                            commentId: '',
                            recommentId: '',
                        }),
                        content: OrderedMap({
                            asdfasdf: Map({
                                userName: '本宫不死你终究是妾',
                                gender: 'male',
                                text: '您说得太好啦！',
                                time: '',
                                visibility: false,
                                like: Map({
                                    number: 21,
                                    clicked: false,
                                }),
                                recomment: OrderedMap({
                                    ddddwqerfw4re: Map({
                                        userName: '我就是扯淡',
                                        gender: 'female',
                                        to: '本宫不死你终究',
                                        text: 'asdfsadf',
                                        time: '',
                                    }),
                                    asdverwarewq: Map({
                                        userName: '扯淡就是我',
                                        gender: 'female',
                                        to: '本宫不死你终究',
                                        text: 'asdfsadf',
                                        time: '',
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            }),
            3: Map({
                viewMode: 'main', // main 或者 operation
                text: '普罗泰戈拉说：“人是万物的尺度”。普罗泰戈拉对人的定义在当时具有进步意义，但也为现代人的虚妄自大提供了心理支持，更虚妄的是后半句——“人是存在者存在的尺度，也是不存在者不存在的尺度”。这段话展现了人文主义与唯心主义的有机结合，这种主观唯心主义的观点甚至不是为了宣扬人文主义，这是普罗泰戈拉在说出他所理解的真理：世界上的所有事物都是人的意识产生的，没有意识便没有世上万物。',
                operation: Map({
                    viewMode: '',
                    share: Map({
                        number: 20,
                    }),
                    like: Map({
                        number: 135,
                        clicked: false,
                    }),
                    revise: '普罗泰戈拉说：“人是万物的尺度”。普罗泰戈拉对人的定义在当时具有进步意义，但也为现代人的虚妄自大提供了心理支持，更虚妄的是后半句——“人是存在者存在的尺度，也是不存在者不存在的尺度”。这段话展现了人文主义与唯心主义的有机结合，这种主观唯心主义的观点甚至不是为了宣扬人文主义，这是普罗泰戈拉在说出他所理解的真理：世界上的所有事物都是人的意识产生的，没有意识便没有世上万物。',
                    notes: Map({
                        title: '',
                        text: '',
                    }),
                    comment: Map({
                        location: Map({
                            viewMode: 'comment',
                            text: '',
                            commentId: '',
                            recommentId: '',
                        }),
                        content: OrderedMap({
                            ddwwdh: Map({
                                userName: '本宫不死你终究是妾',
                                gender: 'male',
                                text: '您说得太好啦！',
                                time: '',
                                visibility: false,
                                like: Map({
                                    number: 23,
                                    clicked: false,
                                }),
                                recomment: OrderedMap({
                                    wrewh: Map({
                                        userName: '我就是扯淡',
                                        gender: 'female',
                                        to: '本宫不死你终究是妾',
                                        text: 'asdfsadf',
                                        time: '',
                                    }),
                                    ujthr: Map({
                                        userName: '扯淡就是我',
                                        gender: 'female',
                                        to: '本宫不死你终究',
                                        text: 'asdfsadf',
                                        time: '',
                                    }),
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
    }),
    notes: Map({
        viewMode: 'academyNotes',
        title: '学院笔记',
        academyNotes: Map({
            viewMode: 'main', // main, share, noteDetail
            notesId: 'asdasddsasss',
            notes: OrderedMap({
                asdasddsasss: Map({
                    title: '我是谁？',
                    order: '2',
                    time: '2017-8-19 20:22',
                    text: '我是谁？我我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                }),
            }),
        }),
        winkThought: Map({
            viewMode: 'main', // main, share, edit, notesDetail
            notesId: '',
            notes: OrderedMap({
                asdfedd: Map({
                    title: '我是什么？我们困',
                    time: '2017-8-19 20:22',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                }),
            }),
        }),
    }),
    plaza: Map({
        plazaName: 'main',
        title: '广场',
        tiananmen: Map({
            viewMode: 'discuss', // main, createSpeech, discuss share
            speechId: 'Asdfasdf',
            createSpeech: Map({
                viewMode: 'main', // main 或者 protocol
                title: '',
                text: '',
                speechId: '',
            }),
            content: OrderedMap({
                Asdfasdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: true,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '', // 无则为aricalauthor的，有则为针对的发言
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
                asdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 12,
                    }),
                    collect: Map({
                        number: 181,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
        freedom: Map({
            viewMode: 'main', // main, createSpeech, discuss
            speechId: '',
            createSpeech: Map({
                viewMode: 'main', // main 或者 protocol
                title: '',
                text: '',
                speechId: '',
            }),
            content: OrderedMap({
                Asdfasdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
                asdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
        france: Map({
            viewMode: 'main', // main, createSpeech, discuss
            speechId: '',
            createSpeech: Map({
                viewMode: 'main', // main 或者 protocol
                title: '',
                text: '',
                speechId: '',
            }),
            content: OrderedMap({
                Asdfasdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
                asdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
        russia: Map({
            viewMode: 'main', // main, createSpeech, discuss
            speechId: '',
            createSpeech: Map({
                viewMode: 'main', // main 或者 protocol
                title: '',
                text: '',
                speechId: '',
            }),
            content: OrderedMap({
                Asdfasdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
                asdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
        flyArea: Map({
            viewMode: 'main', // main, createSpeech, discuss
            speechId: '',
            createSpeech: Map({
                viewMode: 'main', // main 或者 protocol
                title: '',
                text: '',
                speechId: '',
            }),
            content: OrderedMap({
                Asdfasdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                    time: '',
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    gender: 'female',
                                    to: '太空放屁，自强不吸',
                                    text: '您说得太好啦！',
                                }),
                            }),
                        }),
                    }),
                }),
                asdf: Map({
                    userName: '太空放屁，自强不吸',
                    gender: 'male',
                    title: '对生活不满意， 怎么活下去',
                    text: '我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。我是谁？我是什么？我们困惑的这两个问题是社会学问题。第一个问题描述的是社会身份，描述的是虚拟主体在社会生活中的位置；第二个问题描述的是虚拟主体的边界，同时也是想象中社会共同体的边界。“我是谁”这个问题的出现及其回答印证了社会生活中普遍存在的身份焦虑；“我是什么”并不是对我的身份质疑，而是对指代我身份的虚拟主体和虚拟主体所处的想象的社会共同体之间的运行关系的质疑，这个问题意味着我和世界之间关系的崩塌。',
                    share: Map({
                        number: 121,
                    }),
                    collect: Map({
                        number: 18,
                    }),
                    discuss: Map({
                        visibility: false,
                        location: Map({
                            text: '',
                            time: '',
                            discussId: '',
                        }),
                        content: OrderedMap({
                            '2017-8-15': OrderedMap({
                                asdfasdf: Map({
                                    userName: '本宫不死你终究是妾',
                                    to: '太空放屁，自强不吸',
                                    content: '您说得太好啦！',
                                    gender: 'female',
                                    counterpart: 'other',
                                    complete: true,
                                }),
                                sssa: Map({
                                    userName: '本宫不死你终究是妾',
                                    to: '太空放屁，自强不吸',
                                    content: '您说得太好啦！',
                                    gender: 'female',
                                    counterpart: 'other',
                                    complete: true,
                                }),
                                asfwew: Map({
                                    userName: '本宫不死你终究是妾',
                                    to: '太空放屁，自强不吸',
                                    content: '您说得太好啦！',
                                    gender: 'female',
                                    counterpart: 'other',
                                    complete: true,
                                }),
                                qqq: Map({
                                    userName: '本宫不死你终究是妾',
                                    to: '太空放屁，自强不吸',
                                    content: '您说得太好啦！',
                                    gender: 'female',
                                    counterpart: 'other',
                                    complete: true,
                                }),
                            }),
                        }),
                    }),
                }),
            }),
        }),
    }),
    news: OrderedMap({
        viewMode: '未读消息',
        转发: Map({
            vbnasdfjhg: Map({
                userName: '太空放屁，自强不吸', // 转发你文章的人的昵称
                text: '你说的太好了',
                time: '',
                location: Map({
                    plazaName: 'tiananmen',
                    speechId: '',
                }),
                read: false,
            }),
        }),
        评论: Map({
            Asdfasdf: Map({ // 知道消息大概内容， 位置，阅读否
                userName: '太空放屁，自强不吸',
                text: '你说的太好了',
                time: '',
                location: Map({
                    order: '1',
                }),
                read: false,
            }),
        }),
        回复: Map({
            Asdfasdf: Map({
                userName: '太空放屁，自强不吸',
                text: '你说的太好了',
                time: '',
                location: Map({
                    plazaName: 'tiananmen',
                    speechId: '',
                }),
                read: true,
            }),
        }),
        点赞: Map({
            Asdfasdf: Map({
                userName: '太空放屁，自强不吸',
                text: '你说的太好了', // 此时的text表示自己的评论
                time: '',
                location: Map({
                    order: '1',
                }),
                read: true,
            }),
        }),
        收藏: Map({
            Asdfasdf: Map({
                userName: '太空放屁，自强不吸',
                time: '',
                location: Map({
                    plazaName: 'tiananmen',
                    speechId: '',
                }),
                read: true,
            }),
        }),
        系统消息: OrderedMap({
            Asdfasdfasfdfds: Map({
                text: '你少说点吧',
                time: '',
                read: false,
            }),
        }),
    }),
    me: OrderedMap({
        viewMode: '我的信息',
        我的演讲: OrderedMap({
            Asdfasdf: Map({ // 基本信息 位置
                speechTitle: '怎么活下去',
                time: '',
                location: Map({
                    plazaName: 'tiananmen',
                    speechId: 'afasdf',
                }),
            }),
        }),
        我的转发: OrderedMap({
            pokjnbhy: Map({
                source: 'academy', // academy， notes, plaza
                text: '你说的太好了',
                time: '',
                location: Map({
                    order: '1',
                }),
            }),
            vbnjhg: Map({
                source: 'notes',
                text: '你说的太好了',
                time: '',
                location: Map({
                    viewMode: 'academyNotes', // academyNotes, winkThought
                    notesId: '',
                }),
            }),
            vbnasdfjhg: Map({
                source: 'plaza',
                text: '你说的太好了',
                time: '',
                location: Map({
                    plazaName: 'tiananmen',
                    speechId: '',
                }),
            }),
        }),
        我的收藏: OrderedMap({
            Asdfasdf: Map({
                userName: 'asdf',
                speechTitle: '怎么活下去',
                time: '',
                location: Map({
                    plazaName: 'tiananmen',
                    speechId: 'adfafsd',
                }),
            }),
        }),
        我的点赞: OrderedMap({
            Asdfasdf: Map({
                userName: '太空放屁，自强不吸', // 别人的名字 或者微斯人
                text: '你说的太好了', // 此时的text表示别人的评论
                time: '',
                location: Map({
                    viewMode: 'comment', // 'main', 'comment'
                    order: '1',
                    commentId: 'asfsa',
                }),
            }),
        }),
        我的评论: OrderedMap({
            Asdfasdf: Map({ // 知道消息大概内容， 位置，阅读否
                userName: '太空放屁，自强不吸',
                text: '你说的太好了',
                time: '2018-01-01',
                location: Map({
                    viewMode: 'comment',
                    order: '1',
                    commentId: 'adfasdf',
                    recommentId: 'asdf',
                }),
            }),
        }),
        我的回复: OrderedMap({
            Asdfasdf: Map({
                userName: '太空放屁，自强不吸',
                text: '你说的太好了',
                time: '',
                location: Map({
                    plazaName: 'tiananmen',
                    speechId: '',
                }),
            }),
        }),
        我的信息: OrderedMap({
            phoneNumber: 23,
            userName: '',
            gender: 'female',
            quantum: 'asdfas',
            start: 'asfdaf',
            token: '',
        }),
        修改密码: OrderedMap({
            oriPassword: '',
            password: '',
            passwordRepeat: '',
        }),
    }),
    pageSet: Map({
        fontSize: '中',
        light: 0.5,
    }),
});

export default initState;
