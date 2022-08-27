import {
  createStyles,
  Header,
  Autocomplete,
  Group,
  Text,
  Divider,
  Container,
  ActionIcon,
  Tooltip,
  Button,
  Center,
  Menu,
} from '@mantine/core';
import { IconSearch, IconNews, IconBell, IconSettings, IconChevronDown, IconDots } from '@tabler/icons';
import { Market } from '../../constants/market';

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.sm,
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',
  },

  links: {
    textTransform: 'capitalize',
    [theme.fn.smallerThan('md')]: {
      display: 'none',
    },
  },

  search: {
    width: 500,
    [theme.fn.smallerThan('xs')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },
  },
  linkLabel: {
    marginRight: 5,
  },

}));

interface AppNavProps {
  market?: Market;
  maxMenuItems: number;
}

const AppNav = ({ market, maxMenuItems }: AppNavProps): JSX.Element => {
  const { classes } = useStyles();

  const menuHandler = () => {
    let items: any = <></>;
    let overflow: any = <></>;
    if ((market != null) && market?.categories.length > maxMenuItems) {
      items = market.categories.slice(0, maxMenuItems).map((c) => {
        const menuItems = c.subCategories?.map((s) => (
          <Menu.Item key={s.title} component='a' href={`/#/category/${s.title}`}>{s.title}</Menu.Item>
        ));

        if (menuItems != null) {
          return (
            <Menu key={c.title} trigger='hover' exitTransitionDuration={0}>
              <Menu.Target>
                <a
                  href={`/#/category/${c.title}`}
                  className={classes.link}
                >
                  <Center>
                    <span className={classes.linkLabel}>{c.title}</span>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Center>
                </a>
              </Menu.Target>
              <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
          );
        }

        return (
          <a
            key={c.title}
            href={`/#/category/${c.title}`}
            className={classes.link}
          >
            {c.title}
          </a>
        );
      });
      overflow = market.categories.slice(maxMenuItems, market.categories.length - 1).map(c => {
        const menuItems = c.subCategories?.map((s) => (
          <Menu.Item key={s.title} component='a' href={`/#/category/${s.title}`}>{s.title}</Menu.Item>
        ));

        if (menuItems != null) {
          return (
            <Menu key={c.title} trigger='hover' exitTransitionDuration={0}>
              <Menu.Target>
                <a
                  href={`/#/category/${c.title}`}
                  className={classes.link}
                >
                  <Group>
                    <span className={classes.linkLabel}>{c.title}</span>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Group>
                </a>
              </Menu.Target>
              <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
          );
        }

        return (
          <Menu.Item key={c.title} component='a' href={`/#/category/${c.title}`}>{c.title}</Menu.Item>
        );
      });
    } else {
      items = market?.categories.map((c) => {
        const menuItems = c.subCategories?.map((s) => (
          <Menu.Item key={s.title}>{s.title}</Menu.Item>
        ));

        if (menuItems != null) {
          return (
            <Menu key={c.title} trigger='hover' exitTransitionDuration={0}>
              <Menu.Target>
                <a
                  href={`/#/category/${c.title}`}
                  className={classes.link}
                  onClick={(event) => event.preventDefault()}
                >
                  <Center>
                    <span className={classes.linkLabel}>{c.title}</span>
                    <IconChevronDown size={12} stroke={1.5} />
                  </Center>
                </a>
              </Menu.Target>
              <Menu.Dropdown>{menuItems}</Menu.Dropdown>
            </Menu>
          );
        }

        return (
          <a
            key={c.title}
            href={`/#/category/${c.title}`}
            className={classes.link}
          >
            {c.title}
          </a>);
      });
    }

    return <>
      {items}
      <Menu shadow='md' width={200} trigger='hover' exitTransitionDuration={0}>
        <Menu.Target>
          <a className={classes.link}><IconDots size={14} /></a>
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>More topics</Menu.Label>
          {overflow}
        </Menu.Dropdown>
      </Menu>
    </>;
  };

  return (
    <Header className={classes.header} mb={30} height='100%'>
      <div className={classes.inner}>
        <Group>
          <IconNews size={24} />
          <Text size='lg' transform='uppercase' weight={700}>Newslice</Text>
        </Group>
        <Group>
          <Autocomplete
            className={classes.search}
            placeholder='Search'
            icon={<IconSearch size={16} stroke={1.5} />}
            data={['React', 'Angular', 'Vue', 'Next.js', 'Riot.js', 'Svelte', 'Blitz.js']}
          />
        </Group>
        <Group>
          <Tooltip label='notifications'>
            <ActionIcon>
              <IconBell size={18} />
            </ActionIcon>
          </Tooltip>
          <Tooltip label='preferences'>
            <ActionIcon>
              <IconSettings size={18} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </div>
      <Container fluid className={classes.inner} mt='md'>
        <Group spacing='xs' className={classes.links}>
          <Button
            key={'home'}
            component='a'
            href='/#/'
            className={classes.link}
            variant='subtle'
          >
            home
          </Button>
          <Divider orientation='vertical' />
          {menuHandler()}
        </Group>
      </Container>
    </Header>
  );
};

export default AppNav;
